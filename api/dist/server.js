"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const auth_route_1 = __importDefault(require("../api/routes/auth.route"));
const users_route_1 = __importDefault(require("../api/routes/users.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const my_hotels_route_1 = __importDefault(require("./routes/my-hotels.route"));
const cloudinary_1 = require("cloudinary");
const hotels_route_1 = __importDefault(require("./routes/hotels.route"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
mongoose_1.default.connect(process.env.MONGODB);
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// PRODUCTION
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "https://reserva-booking.vercel.app",
    credentials: true,
}));
// DEVELOPMENT
// app.use(
// 	cors({
// 		origin: "http://localhost:5173",
// 		credentials: true,
// 	}),
// );
app.use("/api/auth", auth_route_1.default);
app.use("/api/users", users_route_1.default);
app.use("/api/my-hotels", my_hotels_route_1.default);
app.use("/api/hotels", hotels_route_1.default);
app.listen(7000, () => {
    console.log("Server is running on port 7000");
});
