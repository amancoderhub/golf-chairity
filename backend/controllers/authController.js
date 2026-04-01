import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { sendPasswordResetMail } from "../utils/sendMail.js";

const buildAuthPayload = (user) => ({
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        selectedCharity: user.selectedCharity,
        charityContributionPercentage: user.charityContributionPercentage,
        subscriptionStatus: user.subscriptionStatus,
        stripeCustomerId: user.stripeCustomerId,
        subscriptionRenewalDate: user.subscriptionRenewalDate
    },
    token: generateToken(user._id, user.role)
});

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            const error = new Error("Name, email, and password are required");
            error.statusCode = 400;
            throw error;
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error("Email already registered");
            error.statusCode = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json(buildAuthPayload(user));
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }

        res.json(buildAuthPayload(user));
    } catch (error) {
        next(error);
    }
};

export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            const error = new Error("Email is required");
            error.statusCode = 400;
            throw error;
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                message: "If this email exists, a password reset link has been prepared."
            });
        }

        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 30);
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;
        const mailResult = await sendPasswordResetMail({ email: user.email, resetUrl });

        res.json({
            message: mailResult.delivered
                ? "Password reset email sent successfully."
                : "Password reset link generated. Configure your Resend API key to send emails automatically.",
            resetUrl: process.env.NODE_ENV === "production" ? undefined : resetUrl
        });
    } catch (error) {
        next(error);
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            const error = new Error("Token and new password are required");
            error.statusCode = 400;
            throw error;
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: new Date() }
        });

        if (!user) {
            const error = new Error("Reset token is invalid or expired");
            error.statusCode = 400;
            throw error;
        }

        user.password = await bcrypt.hash(password, 12);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.json({ message: "Password reset successfully." });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req, res) => {
    res.json({ user: req.user });
};

export const listUsers = async (_req, res, next) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.json({ users });
    } catch (error) {
        next(error);
    }
};

export const updateRole = async (req, res, next) => {
    try {
        const { role } = req.body;
        if (!["admin", "user"].includes(role)) {
            const error = new Error("Invalid role");
            error.statusCode = 400;
            throw error;
        }
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ user });
    } catch (error) {
        next(error);
    }
};
export const updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, email },
            { new: true }
        ).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ user });
    } catch (error) {
        next(error);
    }
};
