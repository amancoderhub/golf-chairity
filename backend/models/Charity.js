import mongoose from "mongoose";

const charitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

charitySchema.index({ name: 1 });

export const Charity = mongoose.model("Charity", charitySchema);
