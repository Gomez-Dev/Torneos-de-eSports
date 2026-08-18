import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import UsersRepository from "../repositories/users.repository.js";
import { createHash, isValidPassword } from "../utils/hash.js";
import { env } from "./environment.config.js";

const usersRepository = new UsersRepository();

/*
 * Estrategia de registro
 */
passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { first_name, last_name } = req.body;

        // Validación de campos obligatorios
        if (!first_name || !last_name || !email || !password) {
          return done(null, false, {
            message: "Faltan campos obligatorios",
          });
        }

        // Normalización del email
        const normalizedEmail = email.trim().toLowerCase();

        // Validación del formato del email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(normalizedEmail)) {
          return done(null, false, {
            message: "El formato del email es inválido",
          });
        }

        // Validación de contraseña
        if (password.length < 8) {
          return done(null, false, {
            message: "La contraseña debe tener al menos 8 caracteres",
          });
        }

        // Verificar email duplicado
        const existingUser =
          await usersRepository.getUserByEmail(normalizedEmail);

        if (existingUser) {
          return done(null, false, {
            message: "El email ya está registrado",
          });
        }

        // Hash de contraseña
        const hashedPassword = await createHash(password);

        // Crear usuario
        const newUser = await usersRepository.createUser({
          first_name,
          last_name,
          email: normalizedEmail,
          password: hashedPassword,
        });

        return done(null, {
          id: newUser._id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          role: newUser.role,
        });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

/*
 * Estrategia de login
 */
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        if (!email || !password) {
          return done(null, false, {
            message: "Credenciales inválidas",
          });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await usersRepository.getUserByEmail(normalizedEmail);

        if (!user) {
          return done(null, false, {
            message: "Credenciales inválidas",
          });
        }

        const validPassword = await isValidPassword(password, user.password);

        if (!validPassword) {
          return done(null, false, {
            message: "Credenciales inválidas",
          });
        }

        return done(null, {
          id: user._id,
          email: user.email,
          role: user.role,
        });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

/*
 * Estrategia current
 */
passport.use(
  "current",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies?.currentUser,
      ]),
      secretOrKey: env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        return done(null, {
          id: payload.id,
          email: payload.email,
          role: payload.role,
        });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

export default passport;
