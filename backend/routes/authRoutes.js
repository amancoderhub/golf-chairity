import { Router } from "express";
import {
    forgotPassword,
    getProfile,
    listUsers,
    login,
    register,
    resetPassword,
    updateProfile,
    updateRole
} from "../controllers/authController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/admin/users", protect, requireAdmin, listUsers);
router.put("/admin/users/:id/role", protect, requireAdmin, updateRole);

export default router;
