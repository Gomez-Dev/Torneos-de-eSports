import { Router } from "express";

import { getUsers } from "../controllers/users.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { ROLES } from "../constants/roles.constants.js";

const router = Router();

router.get("/", auth, authorize(ROLES.ADMIN), getUsers);

export default router;
