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
};

export const removeReminder = async (user_id, reminder_id) => {
    const query = "DELETE FROM reminders WHERE user_id = ? AND reminder_id = ?";
    const [result] = await db.execute(query, [user_id, reminder_id]);
    return result;
};

export const duplicateReminder = async (reminder_id) => {
    const query = "SELECT title, description, dueDate, status, user_id FROM reminders WHERE reminder_id = ?";
    const [data] = await db.execute(query, [reminder_id]);
    if (!data.length) return null;

    const reminder = data[0];

    const query2 = "INSERT INTO reminders (title, description, dueDate, status, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await db.execute(query2, [reminder.title, reminder.description, reminder.dueDate, reminder.status, reminder.user_id] );
    return result;
};

export const editReminder = async ({title, description, dueDate, status, reminder_id}) => {
    const query = "UPDATE remiders SET title = ?, description = ?, dueDate = ?, status = ? WHERE reminder_id = ?";
    const [result] = await db.execute(query, [title, description, dueDate, status, reminder_id]);
    return result;
};
