import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import UsersService from "../services/users.service.js";
import { env } from "./environment.config.js";

const usersService = new UsersService();

/**
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

        const newUser = await usersService.registerUser({
          first_name,
          last_name,
          email,
          password,
        });

        return done(null, newUser);
      } catch (error) {
        return done(null, false, {
          message: error.message,
          statusCode: error.statusCode,
        });
      }
    },
  ),
);

/**
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
        const user = await usersService.loginUser(email, password);

        return done(null, {
          id: user._id,
          email: user.email,
          role: user.role,
        });
      } catch (error) {
        return done(null, false, {
          message: error.message,
          statusCode: error.statusCode,
        });
      }
    },
  ),
);

/**
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
