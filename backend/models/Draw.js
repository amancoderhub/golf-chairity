import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        userName: String,
        userEmail: String,
        matches: {
            type: Number,
            enum: [3, 4, 5],
            required: true
        },
        matchedNumbers: {
            type: [Number],
            default: []
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "rejected"],
            default: "pending"
        },
        proof: String,
        proofAt: Date
    },
    { _id: false }
);

const drawSchema = new mongoose.Schema(
    {
        numbers: {
            type: [Number],
            validate: [(value) => value.length === 5, "Exactly 5 draw numbers are required"]
        },
        drawType: {
            type: String,
            enum: ["random", "algorithmic"],
            default: "random"
        },
        winners: {
            type: [winnerSchema],
            default: []
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft"
        }
    },
    {
        timestamps: { createdAt: true, updatedAt: false }
    }
);

drawSchema.index({ createdAt: -1 });

export const Draw = mongoose.model("Draw", drawSchema);
