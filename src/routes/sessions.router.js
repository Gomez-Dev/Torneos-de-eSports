import { Router } from "express";
import passport from "passport";

import {
  sessionInfo,
  register,
  login,
  current,
  logout,
} from "../controllers/sessions.controller.js";

const router = Router();

router.get("/", sessionInfo);

router.post(
  "/register",
  (req, res, next) => {
    passport.authenticate(
      "register",
      { session: false },
      (error, user, info) => {
        if (error) {
          return next(error);
        }

        if (!user) {
          if (info?.message === "El email ya está registrado") {
            return res.status(409).json({
              status: "error",
              message: info.message,
            });
          }

          return res.status(400).json({
            status: "error",
            message: info?.message || "Error en el registro",
          });
        }

        req.user = user;
        next();
      },
    )(req, res, next);
  },
  register,
);

router.post(
  "/login",
  (req, res, next) => {
    passport.authenticate("login", { session: false }, (error, user, info) => {
      if (error) {
        return next(error);
      }

      if (!user) {
        return res.status(401).json({
          status: "error",
          message: "Credenciales inválidas",
        });
      }

      req.user = user;
      next();
    })(req, res, next);
  },
  login,
);

router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  current,
);

router.post("/logout", logout);

export default router;
