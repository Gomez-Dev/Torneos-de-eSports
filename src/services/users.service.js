import UsersRepository from "../repositories/users.repository.js";
import { createHash, isValidPassword } from "../utils/hash.js";

class UsersService {
  constructor(usersRepository = new UsersRepository()) {
    this.usersRepository = usersRepository;
  }

  async getAllUsers() {
    return await this.usersRepository.getAllUsers();
  }

  async registerUser({ first_name, last_name, email, password }) {
    if (!first_name || !last_name || !email || !password) {
      const error = new Error("Faltan campos obligatorios");
      error.statusCode = 400;
      throw error;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      const error = new Error("El formato del email es inválido");
      error.statusCode = 400;
      throw error;
    }

    if (password.length < 8) {
      const error = new Error("La contraseña debe tener al menos 8 caracteres");
      error.statusCode = 400;
      throw error;
    }

    const existingUser =
      await this.usersRepository.getUserByEmail(normalizedEmail);

    if (existingUser) {
      const error = new Error("El email ya está registrado");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await createHash(password);

    return await this.usersRepository.createUser({
      first_name,
      last_name,
      email: normalizedEmail,
      password: hashedPassword,
    });
  }

  async loginUser(email, password) {
    if (!email || !password) {
      const error = new Error("Credenciales inválidas");
      error.statusCode = 401;
      throw error;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await this.usersRepository.getUserByEmail(normalizedEmail);

    if (!user) {
      const error = new Error("Credenciales inválidas");
      error.statusCode = 401;
      throw error;
    }

    const validPassword = await isValidPassword(password, user.password);

    if (!validPassword) {
      const error = new Error("Credenciales inválidas");
      error.statusCode = 401;
      throw error;
    }

    return user;
  }
}

export default UsersService;
