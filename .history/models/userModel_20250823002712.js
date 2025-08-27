import db from "../config/db.js";

export const createUser = async({username,firstName, lastName, email, password}) => {
    const query = "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.execute(query, [username, firstName, lastName, email, password]);
    return result.insertId;
}

export const findUserByEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(query, [email]);
    return rows[0];
}


export const profile_Edit = async(username, firstname, lastname, email, phone) => {
    const query = "UPDATE users SET username = ?, firstname = ?, lastname = ?, email = ?, phone = ?";
    const [result] = await db.execute(query, [username, firstname, lastname, email, phone]);
    return[result];
}

export const profile_Render = async (user_id) => {
    const query = "SELECT * FROM users WHERE user_id = ?";
    const [result] = await (query, [user_id]);
    return result;
}