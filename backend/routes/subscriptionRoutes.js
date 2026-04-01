import { Router } from "express";
import {
    createCheckoutSession,
    getMySubscription,
    handleStripeWebhook
} from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/checkout-session", protect, createCheckoutSession);
router.get("/me", protect, getMySubscription);

export { handleStripeWebhook };
export default router;
