import { Score } from "../models/Score.js";

export const getAllScores = async (_req, res, next) => {
    try {
        const scores = await Score.find().sort({ createdAt: -1 }).populate("userId", "name email");
        res.json({ scores });
    } catch (error) {
        next(error);
    }
};
