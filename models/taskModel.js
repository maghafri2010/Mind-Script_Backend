import db from "../config/db.js";

export const create_task = async ({title, description, dueDate, status, project, team, user_id}) => {
    const query = "INSERT INTO tasks (title, description, dueDate, status, project, team, user_id) VALUES (? , ?, ?, ?, ?, ?, ?)";
    const [result] = await db.execute(query, [title, description, dueDate, status, project, team, user_id ]);
    return result.insertId;
}

export const get_task = async (user_id) => {
    const query = "SELECT task_id, user_id, title, description, dueDate, status, project, team FROM tasks WHERE user_id = ?";
    const [result] = await db.execute(query, [user_id]);
    return result;
}

export const remove_task = async(user_id, task_id) => {
    const query = "DELETE FROM tasks WHERE user_id = ? AND task_id = ?";
    const [result] = await db.execute(query, [user_id, task_id]);
    return result;
}

