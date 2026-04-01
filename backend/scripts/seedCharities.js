import "../shared/loadEnv.js";
import { connectDB } from "../config/db.js";
import { Charity } from "../models/Charity.js";

const charities = [
    {
        name: "Junior Fairways Fund",
        description: "Expands access to coaching, equipment, and travel support for young golfers from underserved communities.",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80"
    },
    {
        name: "Greens For Recovery",
        description: "Uses outdoor sport programs to support mental health recovery and community wellbeing.",
        image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=900&q=80"
    },
    {
        name: "Open Hands Foundation",
        description: "Funds inclusive education, nutrition drives, and family assistance programs across local communities.",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80"
    }
];

const seedCharities = async () => {
    try {
        await connectDB();
        await Charity.deleteMany();
        await Charity.insertMany(charities);
        console.log("Sample charities seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("Failed to seed charities", error);
        process.exit(1);
    }
};

seedCharities();
