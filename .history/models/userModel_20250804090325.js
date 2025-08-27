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

