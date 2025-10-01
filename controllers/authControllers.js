import { response } from "express";
import { createUser, findUserByEmail } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;


export const register = async(req, res) => {
    try {
        const {username, firstName, lastName, email, password} = req.body;

        // Validate required fields
        if (!username || !firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const userExists = await findUserByEmail(email);

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt rounds

        const userID = await createUser({username, firstName, lastName, email, password: hashedPassword});
        res.status(201).json({
            success: true,
            message: "User created successfully",
            userID
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const Login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        };

        const token = jwt.sign(
            { user_id: user.user_id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user_id: user.user_id
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

export const logout = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const reset = async (req, res) => {
    try {
        const {email} = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const userExists = await findUserByEmail(email);
        
        if (!userExists) {
            return res.status(400).json({
                success: false,
                message: "This email doesn't exist"
            });
        }

        // Add password reset logic here
        res.status(200).json({
            success: true,
            message: "Password reset instructions sent to email"
        });
    } catch (error) {
        console.error('Reset error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}