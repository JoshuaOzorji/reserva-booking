"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotel_model_1 = __importDefault(require("../models/hotel.model"));
const express_validator_1 = require("express-validator");
const stripe_1 = __importDefault(require("stripe"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const stripe = new stripe_1.default(process.env.STRIPE_API_KEY);
const router = express_1.default.Router();
router.get("/featured-hotels", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const featuredHotels = yield hotel_model_1.default.find();
        featuredHotels.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
        const lastFiveHotels = featuredHotels.slice(0, 4);
        res.json(lastFiveHotels);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching hotels" });
    }
}));
router.post("/:hotelId/bookings/payment-intent", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. totalCost
    // 2. hotelId
    // 3. userId
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;
    const hotel = yield hotel_model_1.default.findById(hotelId);
    if (!hotel) {
        return res.status(400).json({ message: "Hotel not found" });
    }
    const totalCost = hotel.pricePerNight * numberOfNights;
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: totalCost * 100,
        currency: "gbp",
        metadata: { hotelId, userId: req.userId },
    });
    if (!paymentIntent.client_secret) {
        return res.status(500).json({ message: "Error creating payment intent" });
    }
    const response = {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret.toString(),
        totalCost,
    };
    res.send(response);
}));
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = constructSearchQuery(req.query);
        let sortOptions = {};
        switch (req.query.sortOption) {
            case "starRating":
                sortOptions = { starRating: -1 };
                break;
            case "pricePerNightAsc":
                sortOptions = { pricePerNight: 1 };
                break;
            case "pricePerNightDesc":
                sortOptions = { pricePerNight: -1 };
                break;
        }
        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
        const skip = (pageNumber - 1) * pageSize;
        const hotels = yield hotel_model_1.default.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);
        const total = yield hotel_model_1.default.countDocuments();
        const response = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}));
router.get("/:id", [(0, express_validator_1.param)("id").notEmpty().withMessage("Hotel ID is required")], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id.toString();
    try {
        const hotel = yield hotel_model_1.default.findById(id);
        res.json(hotel);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching hotel" });
    }
}));
router.post("/:hotelId/bookings", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentIntentId = req.body.paymentIntentId;
        const paymentIntent = yield stripe.paymentIntents.retrieve(paymentIntentId);
        if (!paymentIntent) {
            return res.status(400).json({ message: "payment intent not found" });
        }
        if (paymentIntent.metadata.hotelId !== req.params.hotelId ||
            paymentIntent.metadata.userId !== req.userId) {
            return res.status(400).json({ message: "payment intent mismatch" });
        }
        if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({
                message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
            });
        }
        const newBooking = Object.assign(Object.assign({}, req.body), { userId: req.userId });
        const hotel = yield hotel_model_1.default.findOneAndUpdate({ _id: req.params.hotelId }, { $push: { bookings: newBooking } });
        if (!hotel) {
            return res.status(400).json({ message: "hotel not found" });
        }
        yield hotel.save();
        res.status(200).send();
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}));
const constructSearchQuery = (queryParams) => {
    let constructedQuery = {};
    if (queryParams.destination) {
        constructedQuery.$or = [
            {
                city: new RegExp(queryParams.destination, "i"),
            },
            { country: new RegExp(queryParams.destination, "i") },
        ];
    }
    if (queryParams.adultCount) {
        constructedQuery.adultCount = {
            $gte: parseInt(queryParams.adultCount),
        };
    }
    if (queryParams.childCount) {
        constructedQuery.childCount = {
            $gte: parseInt(queryParams.childCount),
        };
    }
    if (queryParams.facilities) {
        constructedQuery.facilities = {
            $all: Array.isArray(queryParams.facilities)
                ? queryParams.facilities
                : [queryParams.facilities],
        };
    }
    if (queryParams.types) {
        constructedQuery.type = {
            $in: Array.isArray(queryParams.types)
                ? queryParams.types
                : [queryParams.types],
        };
    }
    if (queryParams.stars) {
        const starRatings = Array.isArray(queryParams.stars)
            ? queryParams.stars.map((star) => parseInt(star))
            : parseInt(queryParams.stars);
        constructedQuery.starRating = { $in: starRatings };
    }
    if (queryParams.maxPrice) {
        constructedQuery.pricePerNight = {
            $lte: parseInt(queryParams.maxPrice).toString(),
        };
    }
    return constructedQuery;
};
exports.default = router;
