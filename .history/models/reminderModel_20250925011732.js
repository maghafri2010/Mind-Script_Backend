import db from "../config/db.js";


export const getReminders = async(user_id) => {
    const query = "SELECT title, dueDate FROM reminders WHERE user_id = ?";
    const [result] = await db.execute(query, [user_id]);
    return result;
};

export const createReminder = async (title, description, dueDate, status, user_id ) => {
    const query = "INSERT INTO reminders (title, description, dueDate, status, user_id) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.execute(query, [title, description, dueDate, status, user_id]);
    return result.insertId;
}

export const removeReminder = async (user_id, reminder_id) => {
    const query = "DELETE FROM reminders WHERE user_id = ? AND reminder_id = ?";
    const [result] = await db.execute(query, [user_id, reminder_id]);
    return result;

} 