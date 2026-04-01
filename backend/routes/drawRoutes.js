import { Router } from "express";
import { getLatestDraw, runDraw, publishDraw, updateWinnerStatus, getMyWinnings, submitWinnerProof } from "../controllers/drawController.js";
import {
    protect,
    requireAdmin
} from "../middleware/authMiddleware.js";

const router = Router();

router.get("/draws/latest", protect, getLatestDraw);
router.get("/draws/my-winnings", protect, getMyWinnings);
router.post("/draws/run", protect, requireAdmin, runDraw);
router.put("/draws/:id/publish", protect, requireAdmin, publishDraw);
router.put("/draws/:drawId/winners/:userId/status", protect, requireAdmin, updateWinnerStatus);
router.put("/draws/winners/proof", protect, submitWinnerProof);


export default router;
