import { Router } from "express";
import { sessionInfo } from "../controllers/sessions.controller.js";

const router = Router();

router.get("/", sessionInfo);

export default router;
