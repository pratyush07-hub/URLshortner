import { Router } from "express";
import { createShortUrl, createShortUrlAuth, redirectShortUrl } from "../controllers/shorturl.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-shorturl").post(createShortUrl)
router.route("/create-shorturl-auth").post(verifyUser, createShortUrlAuth)
router.route("/:shorturl").get(redirectShortUrl)

export default router