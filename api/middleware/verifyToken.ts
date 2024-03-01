import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
	namespace Express {
		interface Request {
			userId: string;
		}
	}
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies["auth_token"];
	console.log("Token:", token);
	if (!token) {
		return res.status(401).json({ message: "unauthorized" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		console.log("Decoded Token:", decoded);
		req.userId = (decoded as JwtPayload).userId;
		next();
	} catch (error) {
		console.error("JWT Verification Error:", error);
		return res.status(401).json({ message: "unauthorized" });
	}
};

export default verifyToken;
