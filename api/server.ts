import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import authRoutes from "../api/routes/auth.route";
import userRoutes from "../api/routes/users.route";
import cookieParser from "cookie-parser";
import myHotelRoutes from "./routes/my-hotels.route";
import { v2 as cloudinary } from "cloudinary";
import hotelRoutes from "./routes/hotels.route";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
		credentials: true,
	}),
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);

app.listen(7000, () => {
	console.log("Server is running on port 7000");
});
