import { Score } from "../models/Score.js";
import {
    addScoreForUser,
    getLatestScoresForUser
} from "../services/scoreService.js";

export const addScore = async (req, res, next) => {
    try {
        const { score, date } = req.body;

        if (!score || !date) {
            const error = new Error("Score and date are required");
            error.statusCode = 400;
            throw error;
        }

        const result = await addScoreForUser(req.user._id, { score, date });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const getLatestScores = async (req, res, next) => {
    try {
        const scores = await getLatestScoresForUser(req.user._id);
        res.json({ scores });
    } catch (error) {
        next(error);
    }
};

export const getAllScoresAdmin = async (req, res, next) => {
    try {
        const scores = await Score.find().populate("userId", "name email").sort({ createdAt: -1 });
        res.json({ scores });
    } catch (error) {
        next(error);
    }
};
