import express from "express";
import process from "process";
import session from "express-session";
import passport from "./config/passport.js";
import authRouter from "./routes/Auth.js";
import tripsRouter from "./routes/Trips.js";
import expensesRouter from "./routes/Expenses.js";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const myapp = express();
const PORT = process.env.PORT || 3000;

// Session configuration
myapp.use(
  session({
    secret: "fintrip-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);

// Initializes Passport
myapp.use(passport.initialize());
// Reads the session cookie (middleware)
myapp.use(passport.session());

// Will work once from the frontend (local server), we run the 'build' command to create the 'dist' folder
myapp.use("/", express.static("./frontend/dist"));

myapp.use(express.json());

// This middleware is used to parse URL-encoded data sent in the request body.
// It allows the server to handle form submissions and other types of data sent
// in the URL-encoded format. The extended option allows for rich objects and
// arrays to be encoded into the URL-encoded format, which can be useful for
// handling complex data structures.
myapp.use(express.urlencoded({ extended: true }));

myapp.use("/api/auth", authRouter);
myapp.use("/api/trips", tripsRouter);
myapp.use("/api/trips", expensesRouter);

myapp.get("/api/health", (req, res) => {
  res.json({
    message: "FinTrip backend is running",
  });
});

myapp.get("*splat", function (req, res) {
  res.sendFile("index.html", {
    root: join(__dirname, "./frontend/dist"),
  });
});

myapp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
