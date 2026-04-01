import { Score } from "../models/Score.js";
import { User } from "../models/User.js";

const generateUniqueNumbers = () => {
    const numbers = new Set();

    while (numbers.size < 5) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    return [...numbers].sort((a, b) => a - b);
};

export const buildDrawNumbers = () => generateUniqueNumbers();

export const evaluateDrawWinners = async (numbers) => {
    const users = await User.find({ subscriptionStatus: "active" }).select("name email");
    const winners = [];

    for (const user of users) {
        const scoreDocs = await Score.find({ userId: user._id })
            .sort({ date: -1, createdAt: -1 })
            .limit(5)
            .lean();

        if (scoreDocs.length < 5) {
            continue;
        }

        const userNumbers = scoreDocs.map((entry) => entry.score);
        const matchedNumbers = userNumbers.filter((value) => numbers.includes(value));
        const uniqueMatches = [...new Set(matchedNumbers)];

        if (uniqueMatches.length >= 3) {
            winners.push({
                userId: user._id,
                userName: user.name,
                userEmail: user.email,
                matches: uniqueMatches.length,
                matchedNumbers: uniqueMatches
            });
        }
    }

    return winners.sort((a, b) => b.matches - a.matches);
};
