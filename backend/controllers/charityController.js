import { Charity } from "../models/Charity.js";
import { User } from "../models/User.js";

export const getAllCharities = async (_req, res, next) => {
    try {
        const charities = await Charity.find().sort({ createdAt: -1 });
        res.json({ charities });
    } catch (error) {
        next(error);
    }
};

export const selectCharity = async (req, res, next) => {
    try {
        const { charityId, charityContributionPercentage } = req.body;
        const charity = await Charity.findById(charityId);

        if (!charity) {
            const error = new Error("Selected charity was not found");
            error.statusCode = 404;
            throw error;
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                selectedCharity: charity._id,
                charityContributionPercentage: charityContributionPercentage || 10
            },
            { new: true }
        );

        res.json({
            message: "Charity updated successfully",
            user
        });
    } catch (error) {
        next(error);
    }
};
export const createCharity = async (req, res, next) => {
    try {
        const charity = await Charity.create(req.body);
        res.status(201).json({ charity });
    } catch (error) {
        next(error);
    }
};

export const updateCharity = async (req, res, next) => {
    try {
        const charity = await Charity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!charity) return res.status(404).json({ message: "Charity not found" });
        res.json({ charity });
    } catch (error) {
        next(error);
    }
};

export const deleteCharity = async (req, res, next) => {
    try {
        const charity = await Charity.findByIdAndDelete(req.params.id);
        if (!charity) return res.status(404).json({ message: "Charity not found" });
        res.json({ message: "Charity deleted" });
    } catch (error) {
        next(error);
    }
};
