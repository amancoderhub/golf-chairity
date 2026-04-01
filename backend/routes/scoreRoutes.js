import { Router } from "express";
import { addScore, getLatestScores, getAllScoresAdmin } from "../controllers/scoreController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/scores", protect, getLatestScores);
router.post("/scores", protect, addScore);
router.get("/scores/admin", protect, requireAdmin, getAllScoresAdmin);

export default router;
