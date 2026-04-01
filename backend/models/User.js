import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        selectedCharity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Charity",
            default: null,
            index: true
        },
        charityContributionPercentage: {
            type: Number,
            default: 10,
            min: 10,
            max: 100
        },
        subscriptionStatus: {
            type: String,
            enum: ["inactive", "active", "past_due", "cancelled"],
            default: "inactive",
            index: true
        },
        stripeCustomerId: {
            type: String,
            default: null,
            index: true
        },
        subscriptionRenewalDate: {
            type: Date,
            default: null
        },
        resetPasswordToken: {
            type: String,
            default: null
        },
        resetPasswordExpires: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

userSchema.index({ role: 1, createdAt: -1 });

export const User = mongoose.model("User", userSchema);
