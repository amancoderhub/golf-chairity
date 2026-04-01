import { Router } from "express";
import {
    createCharity,
    deleteCharity,
    getAllCharities,
    selectCharity,
    updateCharity
} from "../controllers/charityController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/charities", getAllCharities);
router.patch("/charities/select", protect, selectCharity);

// Admin routes
router.post("/charities", protect, requireAdmin, createCharity);
router.put("/charities/:id", protect, requireAdmin, updateCharity);
router.delete("/charities/:id", protect, requireAdmin, deleteCharity);

export default router;
