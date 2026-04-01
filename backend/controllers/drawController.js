import { Draw } from "../models/Draw.js";
import { buildDrawNumbers, evaluateDrawWinners } from "../services/drawService.js";

export const runDraw = async (req, res, next) => {
    try {
        const drawType = req.body.drawType || "random";
        const numbers = buildDrawNumbers();
        const winners = await evaluateDrawWinners(numbers);

        const draw = await Draw.create({
            numbers,
            drawType,
            winners,
            status: "draft"
        });

        res.status(201).json({ draw });
    } catch (error) {
        next(error);
    }
};

export const getLatestDraw = async (req, res, next) => {
    try {
        const isAdmin = req.user?.role === "admin";
        const query = isAdmin ? {} : { status: "published" };
        const draw = await Draw.findOne(query).sort({ createdAt: -1 });
        res.json({ draw });
    } catch (error) {
        next(error);
    }
};

export const publishDraw = async (req, res, next) => {
    try {
        const draw = await Draw.findByIdAndUpdate(
            req.params.id,
            { status: "published" },
            { new: true }
        );
        if (!draw) return res.status(404).json({ message: "Draw not found" });
        res.json({ draw });
    } catch (error) {
        next(error);
    }
};

export const updateWinnerStatus = async (req, res, next) => {
    try {
        const { paymentStatus } = req.body;
        if (!["pending", "paid", "rejected"].includes(paymentStatus)) {
            return res.status(400).json({ message: "Invalid status" });
        }
        const draw = await Draw.findOneAndUpdate(
            { _id: req.params.drawId, "winners.userId": req.params.userId },
            { $set: { "winners.$.paymentStatus": paymentStatus } },
            { new: true }
        );
        if (!draw) return res.status(404).json({ message: "Winner not found globally" });
        res.json({ draw });
    } catch (error) {
        next(error);
    }
};

export const getMyWinnings = async (req, res, next) => {
    try {
        const draws = await Draw.find({
            "winners.userId": req.user._id,
            "winners.paymentStatus": "paid"
        });

        let totalWon = 0;
        for (const draw of draws) {
            const w = draw.winners.find((w) => w.userId.toString() === req.user._id.toString());
            if (w) {
                if (w.matches === 5) totalWon += 50000;
                else if (w.matches === 4) totalWon += 3500;
                else if (w.matches === 3) totalWon += 2500;
            }
        }

        res.json({ totalWon, wonDrawsCount: draws.length });
    } catch (error) {
        next(error);
    }
};

export const submitWinnerProof = async (req, res, next) => {
    try {
        const { proof } = req.body;
        const draw = await Draw.findOneAndUpdate(
            { "winners.userId": req.user._id },
            {
                $set: {
                    "winners.$.proof": proof,
                    "winners.$.proofAt": new Date()
                }
            },
            { new: true, sort: { createdAt: -1 } }
        );

        if (!draw) return res.status(404).json({ message: "Winning record not found" });
        res.json({ draw });
    } catch (error) {
        next(error);
    }
};
