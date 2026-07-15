import express from "express";
// Hashes passwords
import bcrypt from "bcrypt";

import usersDB from "../models/UsersDB.js";

// Groups all authentication endpoints together (api routes)
const router = express.Router();

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
        const newUser = await usersDB.createUsers({
            name,
            email,
            passwordHash,
        });

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: "Unable to register this user.",
        });
    }
});

export default router;