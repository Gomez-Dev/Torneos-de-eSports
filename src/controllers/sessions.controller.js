import SessionsService from "../services/sessions.service.js";
import { env } from "../config/environment.config.js";

const sessionsService = new SessionsService();

export const sessionInfo = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Sessions resource initialized",
  });
};

export const register = async (req, res) => {
  try {
    const user = await sessionsService.register(req.body);

    res.status(201).json({
      status: "success",
      payload: user,
    });
  } catch (error) {
    if (error.message === "El email ya está registrado") {
      return res.status(409).json({
        status: "error",
        message: error.message,
      });
    }

    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { token } = await sessionsService.login(req.body);

    res
      .cookie("currentUser", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 3600000,
        secure: env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        status: "success",
        message: "Login correcto",
      });
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: error.message,
    });
  }
};

export const current = (req, res) => {
  res.status(200).json({
    status: "success",
    payload: req.user,
  });
};

export const logout = (req, res) => {
  res.clearCookie("currentUser");

  res.status(200).json({
    status: "success",
    message: "Sesión cerrada",
  });
};
