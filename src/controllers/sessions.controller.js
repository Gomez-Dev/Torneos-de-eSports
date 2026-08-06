import SessionsService from "../services/sessions.service.js";

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
