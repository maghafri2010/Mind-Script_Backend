import db from "../config/db.js";

export const createUser = async({username, firstName, lastName, email, password}) => {
    const query = "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.execute(query, [username, firstName, lastName, email, password]);
    return result.insertId;
};

export const findUserByEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(query, [email]);
    return rows[0];
};


export const profile_Edit = async(username, firstname, lastname, email, phone, id) => {
    const query = "UPDATE users SET username = ?, firstname = ?, lastname = ?, email = ?, phone = ? WHERE id = ? ";
    const [result] = await db.execute(query, [username, firstname, lastname, email, phone, id]);
    return result;
};

export const profile_Render = async (id) => {
    const query = "SELECT * FROM users WHERE id = ?";
    const [result] = await db.execute(query, [id]);
    return result[0];
};

export const getProfilePicture = async (id) => {
    const query = "SELECT picture FROM users WHERE id = ?";
    const [result] = await db.execute(query, {id});
    return result;
};

export const getUsername = async (id) => {
    const query = "SELECT username FROM users WHERE id = ?";
    const [result] = await db.execute(query, {id});
    return result;
};