import UsersRepository from "../repositories/users.repository.js";
import { createHash } from "../utils/hash.js";

class SessionsService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async register(userData) {
    const { first_name, last_name, email, password } = userData;

    // Validación de campos obligatorios
    if (!first_name || !last_name || !email || !password) {
      throw new Error("Faltan campos obligatorios");
    }

    // Normalización del email
    const normalizedEmail = email.trim().toLowerCase();

    // Validación del formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      throw new Error("El formato del email es inválido");
    }

    // Validación de contraseña
    if (password.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }

    // Verificar si el email ya existe
    const existingUser =
      await this.usersRepository.getUserByEmail(normalizedEmail);

    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    // Hash de la contraseña
    const hashedPassword = await createHash(password);

    // Crear usuario
    const newUser = await this.usersRepository.createUser({
      first_name,
      last_name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return {
      id: newUser._id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      role: newUser.role,
    };
  }
}

export default SessionsService;
