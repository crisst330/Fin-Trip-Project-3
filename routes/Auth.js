import express from "express";
import bcrypt from "bcrypt"; // Hashes passwords
import passport from "passport";

import usersDB from "../models/UsersDB.js";

import { isAuthenticated } from "../middleware/auth.js";

// Groups all authentication endpoints together (api routes)
const router = express.Router();

// Authentication routes
router.post("/register", async (req, res) => {
    try {
        // Request body: { "name": "TestName", "email": "test123@example.com", "password": "password123" => hashed}
        const { name, email, password } = req.body;

        // Validates: name, email, password => So, no one can register with missing fields
        if (!name || !email || !password) {
            return res.status(400).json({
                error: "Name, email, and password required. Please try again.",
            });
        }

        const existingUser = await usersDB.findUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                error: "This email, under an existing account, is in the system already."
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // Stores the current new user
        const newUser = await usersDB.createUser({
            name,
            email,
            passwordHash,
        });

        return res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            error: "Unable to register this user.",
        });
    }
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
        if (error) {
            console.error(error);

            return res.status(500).json({
                error: "Unable to log in in at this time."
            });
        }

        if (!user) {
            return res.status(401).json({
                error: info?.message || "Unable to log in user.",
            });
        }
        req.logIn(user, (loginError) => {
            if (loginError) {
                return next(loginError);
            }

            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        });
    })(req, res, next);
});

router.get("/user", isAuthenticated, (req, res) => {
    return res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    });
});

router.get("/logout", (req, res) => {
    req.logout((error) => {
        if (error) {
            console.error(error);

            return res.status(500).json({
                error: "Unable to log out.",
            });
        }
        // Otherwise, show/output logout successful 
        return res.status(200).json({
            message: "Logout successful",
        });
    });
});

export default router;