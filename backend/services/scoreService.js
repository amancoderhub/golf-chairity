import { Score } from "../models/Score.js";

export const addScoreForUser = async (userId, payload) => {
    const createdScore = await Score.create({
        userId,
        score: payload.score,
        date: payload.date
    });

    const allScores = await Score.find({ userId })
        .sort({ date: -1, createdAt: -1 })
        .lean();

    if (allScores.length > 5) {
        const overflowScores = allScores.slice(5);
        const overflowIds = overflowScores.map((item) => item._id);
        await Score.deleteMany({ _id: { $in: overflowIds } });
    }

    const latestScores = await Score.find({ userId }).sort({ date: -1, createdAt: -1 });

    return {
        createdScore,
        latestScores
    };
};

export const getLatestScoresForUser = async (userId) =>
    Score.find({ userId }).sort({ date: -1, createdAt: -1 }).limit(5);
