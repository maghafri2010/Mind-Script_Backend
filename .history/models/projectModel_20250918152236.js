import db from "../config/db.js";


export const getProjects = async (user_id) => {
    const query = "SELECT title, dueDate, status FROM projects WHER user_id = ?";
    const [result] = await db.execute(query, [user_id]);
    return result;
};