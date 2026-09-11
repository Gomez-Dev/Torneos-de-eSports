import UsersService from "../services/users.service.js";
import { userDTO } from "../dto/user.dto.js";

const usersService = new UsersService();

export const getUsers = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();

    const usersDTO = users.map((user) => userDTO(user));

    res.status(200).json({
      status: "success",
      payload: usersDTO,
    });
  } catch (error) {
    next(error);
  }
};
