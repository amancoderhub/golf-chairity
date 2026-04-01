import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protect = async (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

        if (!token) {
            const error = new Error("Authentication token is missing");
            error.statusCode = 401;
            throw error;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 401;
            throw error;
        }

        req.user = user;
        next();
    } catch (error) {
        error.statusCode = error.statusCode || 401;
        next(error);
    }
};

export const requireAdmin = (req, _res, next) => {
    if (req.user?.role !== "admin") {
        const error = new Error("Admin access required");
        error.statusCode = 403;
        return next(error);
    }

    next();
};
