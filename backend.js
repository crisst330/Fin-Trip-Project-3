import express from "express";
import process from "process";
import session from "express-session";
import passport from "./config/passport.js";


// Will import all of our routes here for later
// import authRouter from "./router/Auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const myapp = express();
const PORT = process.env.PORT || 3000;

// Session configuration
myapp.use(
  session({
    secret: "your-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);

// Initialize Passport
myapp.use(passport.initialize());
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

myapp.get("/api/health", (req, res) => {
  res.json({
    message: "FinTrip backend is running",
  });
});

// Will need to implement an index.html file here for this to work and also have already entered the command 'build' for access in the ./frontend/dist directory
myapp.get("*splat", function (req, res) {
  res.sendFile("index.html", {
    root: join(__dirname, "./frontend/dist"),
  });
});

myapp.listen(PORT, () => {
  console.log(`Server is running on port {PORT}`);
});
