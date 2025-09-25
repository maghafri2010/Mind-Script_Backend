import db from "../config/db.js";


export const getReminders = async(user_id) => {
    const query = "SELECT title, dueDate FROM reminders WHERE user_id = ?";
    const [result] = await db.execute(query, [user_id]);
    return result;
};

