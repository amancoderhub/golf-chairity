import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        score: {
            type: Number,
            required: true,
            min: 1,
            max: 45
        },
        date: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: { createdAt: true, updatedAt: false }
    }
);

scoreSchema.index({ userId: 1, date: -1, createdAt: -1 });

export const Score = mongoose.model("Score", scoreSchema);
