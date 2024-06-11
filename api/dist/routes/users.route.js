"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const router = express_1.default.Router();
router.get("/me", verifyToken_1.default, async (req, res) => {
    const userId = req.userId;
    try {
        const user = await user_model_1.default.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
router.post("/register", [
    (0, express_validator_1.check)("firstName", "First name is required").isString(),
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password with 6 or more characters required").isLength({
        min: 6,
    }),
], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {
        let user = await user_model_1.default.findOne({
            email: req.body.email,
        });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        user = new user_model_1.default(req.body);
        await user.save();
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
        }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        res.status(200).send({ message: "Registration successful!" });
    }
    catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
});
exports.default = router;
