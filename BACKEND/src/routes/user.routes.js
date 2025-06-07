import { Router } from "express";
import { getCurrentUser, getStats, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(verifyUser, logoutUser)
router.route("/me").get(verifyUser, getCurrentUser)
router.route("/stats").get(verifyUser, getStats)



export default router