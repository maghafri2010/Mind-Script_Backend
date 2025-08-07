import { response } from "express";
import { createUser, findUserByEmail } from "../models/userModel.js";

export const register = async(req, res) => {
    const {username, firstName, lastName, email, password} = req.body;

    const userExists = await findUserByEmail(email);

    if (userExists) return res.status(400).json({message: "User already exists"});

    const userID = await createUser({username, firstName, lastName, email, password});
    res.status(201).json({message: "User created :", userID})
};

export const Login = async (req, res) => {
    const {email, password} = req.body;

    const user = await findUserByEmail(email);

    if (!user) return res.status(404).json({message: "User not found"});

    if (user.password !== password) return res.status(401).json({message: "Invalid credentials"});

    res.status(200).json({message: "Login successful", userID: user.id});

}

export const logout = (req, res) => {
    res.status(200).json({message: "Logout"});
}

export const reset = async (req, res) => {
    const {email} = req.body;
    const userExists = await findUserByEmail(email);
    if (!userExists) res.status(400).json({message: "this email doesnt exist"});

}