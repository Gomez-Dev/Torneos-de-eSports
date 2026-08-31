import UsersRepository from "../repositories/users.repository.js";

const usersRepository = new UsersRepository();

export const getUsers = async (req, res) => {
  try {
    const users = await usersRepository.getAllUsers();

    const usersWithoutPassword = users.map((user) => ({
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    }));

    res.status(200).json({
      status: "success",
      payload: usersWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
