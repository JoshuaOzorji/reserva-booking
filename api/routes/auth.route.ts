import express, { Request, Response } from "express";
import verifyToken from "../middleware/verifyToken";
import { check, validationResult } from "express-validator";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
router.post(
	"/login",
	[
		check("email", "Email is required").isEmail(),
		check("password", "Password with 6 or more").isLength({ min: 6 }),
		// check("password")
		// 	.isLength({ min: 6 })
		// 	.withMessage("Password must be at least 6 characters"),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ message: errors.array() });
		}
		const { email, password } = req.body;

		try {
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ message: "Invalid Credentials" });
			}
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ message: "Invalid Credentials" });
			}

			const token = jwt.sign(
				{ userId: user.id },
				process.env.JWT_SECRET_KEY as string,
				{ expiresIn: "1d" },
			);
			res.cookie("auth_token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 86400000,
			});
			res.status(200).json({ userId: user.id });
		} catch (error) {}
	},
);
router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
	res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {
	try {
		res.cookie("auth_token", "", { expires: new Date(0) });
		res.status(200).json({ message: "Successfully signed out" });
	} catch (error) {
		res.status(500).json({ message: "Error during sign-out" });
	}
});
export default router;
