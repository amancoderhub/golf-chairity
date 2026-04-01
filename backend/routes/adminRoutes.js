import { Router } from "express";
import { getAllScores } from "../controllers/adminController.js";
import {
    protect,
    requireAdmin
} from "../middleware/authMiddleware.js";

const router = Router();

router.get("/admin/scores", protect, requireAdmin, getAllScores);

export default router;
