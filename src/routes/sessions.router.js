import { Router } from "express";
import { sessionInfo, register } from "../controllers/sessions.controller.js";

const router = Router();

router.get("/", sessionInfo);
router.post("/register", register);

export default router;
