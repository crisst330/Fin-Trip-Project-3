import passport from "passport";

// Temporary Passport configuration,
// later, will add in LocalStrategy, MongoDB user lookup, bcrypt.compare, serialization by user ID and deserialization from MongoDB

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;