import { Router } from "express";
import { createShortUrl, redirectShortUrl } from "../controllers/shorturl.controller.js";

const router = Router();

router.route("/create-shorturl").post(createShortUrl)
router.route("/:shorturl").get(redirectShortUrl)

export default router