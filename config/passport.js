import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

import usersDB from "../models/UsersDB.js";

const strategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await usersDB.findUserByEmail(email);

      if (!user) {
        return done(null, false, {
          message: "User or password incorrect",
        });
      }

      const isValidPassword = await bcrypt.compare(
        password,
        user.passwordHash,
      );

      if (!isValidPassword) {
        return done(null, false, {
          message: "User or password incorrect",
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  },
);

passport.use(strategy);

// After successfully logging in, Passport stores/saves the user ID in the session
passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

// For later requests, Passport takes the saved user ID, queries MongoDB, and places the user onto 
// req.user, which allows protected routes to identify the logged-in user.
passport.deserializeUser(async (userId, done) => {
    try {
        const user = await usersDB.findUserById(userId);

        if(!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
});

export default passport;
