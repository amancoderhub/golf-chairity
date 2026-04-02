import "./shared/loadEnv.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import charityRoutes from "./routes/charityRoutes.js";
import drawRoutes from "./routes/drawRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import subscriptionRoutes, { handleStripeWebhook } from "./routes/subscriptionRoutes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

// Global Middleware
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || origin.includes("vercel.app") || origin === process.env.FRONTEND_URL) {
                callback(null, true);
            } else {
                callback(new Error("CORS blocked by project policy"));
            }
        },
        credentials: true
    })
);
app.use(helmet());
app.use(morgan("dev"));
// Stripe Webhook needs raw body for signature verification
app.post("/webhooks/stripe", express.raw({ type: 'application/json' }), handleStripeWebhook);

app.use(express.json());

// Health Check
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "golf-chairity-monolith" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/game", adminRoutes);
app.use("/api/game", charityRoutes);
app.use("/api/game", drawRoutes);
app.use("/api/game", scoreRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

// --- Serving Frontend ---
const frontendPath = path.join(__dirname, "../frontend/dist");

// Explicitly handle root for health checks
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Explicitly serve assets directory
app.use("/assets", express.static(path.join(frontendPath, "assets")));
// Serve other static files
app.use(express.static(frontendPath));

// For any non-API route, serve index.html
app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) {
        return next();
    }
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDB();
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Backend server listening on port ${port}`);
        });
    } catch (error) {
        console.error("Backend server failed to start", error);
        process.exit(1);
    }
};

startServer();
