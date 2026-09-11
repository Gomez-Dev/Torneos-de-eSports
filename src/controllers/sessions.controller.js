import { env } from "../config/environment.config.js";
import { generateToken } from "../utils/jwt.js";
import { userDTO } from "../dto/user.dto.js";

export const sessionInfo = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Sessions resource initialized",
  });
};

export const register = (req, res) => {
  res.status(201).json({
    status: "success",
    payload: userDTO(req.user),
  });
};

export const login = (req, res) => {
  const token = generateToken(req.user);

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
};

export const current = (req, res) => {
  res.status(200).json({
    status: "success",
    payload: userDTO(req.user),
  });
};

export const logout = (req, res) => {
  res.clearCookie("currentUser");

  res.status(200).json({
    status: "success",
    message: "Sesión cerrada",
  });
};
