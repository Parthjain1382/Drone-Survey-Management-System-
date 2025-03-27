import express from "express";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import requireLogin from "../middleware/requireLogin.js";
import bcrypt from "bcrypt";

dotenv.config();
const UserRouter = express.Router();

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User
UserRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password,role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if the user exists
        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email,role, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

const comparePassword = async (enteredPassword, hashedPassword) => {
    return bcrypt.compare(enteredPassword, hashedPassword);
};

// Login User
UserRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({ 
            message: "Login successful", 
            token: generateToken(user._id),
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Users (Protected Route)
UserRouter.get("/", requireLogin, async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default UserRouter;
