import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        plan: {
            type: String,
            enum: ["monthly", "yearly"],
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "active", "past_due", "cancelled"],
            default: "pending",
            index: true
        },
        startDate: {
            type: Date,
            default: Date.now
        },
        stripeSessionId: {
            type: String,
            index: true
        },
        stripeSubscriptionId: {
            type: String,
            default: null,
            index: true
        }
    },
    {
        timestamps: true
    }
);

subscriptionSchema.index({ userId: 1, createdAt: -1 });

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
