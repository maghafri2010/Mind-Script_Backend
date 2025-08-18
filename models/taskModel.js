import db from "../config/db.js";

export const create_task = async ({title, description, dueDate, status, project, team, user_id}) => {
    const query = "INSERT INTO tasks (title, description, dueDate, status, project, team, user_id) VALUES (? , ?, ?, ?, ?, ?, ?)";
    const [result] = await db.execute(query, [title, description, dueDate, status, project, team, user_id ]);
    return result.insertId;
};

export const get_task = async (user_id) => {
    const query = "SELECT task_id, user_id, title, description, dueDate, status, project, team FROM tasks WHERE user_id = ?";
    const [result] = await db.execute(query, [user_id]);
    return result;
};

export const remove_task = async(user_id, task_id) => {
    const query = "DELETE FROM tasks WHERE user_id = ? AND task_id = ?";
    const [result] = await db.execute(query, [user_id, task_id]);
    return result;
};

export const duplicate_task = async ({task_id}) => {
    const query = "SELECT title, description, dueDate, status, project, team, user_id FROM tasks WHERE task_id = ?";
    const [data] = await db.execute(query, [task_id]);
    if (!data.length) return null;

    const task = data[0];

    const query2 = "INSERT INTO tasks (title, description, dueDate, status, project, team, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await db.execute(query2, [task.title, task.description, task.dueDate, task.status, task.project, task.team, task.user_id] );
    return result;
};

export const edit_task = async ({title, description, dueDate, status, project, team, task_id}) => {
    const query = "UPDATE tasks SET title = ?, description = ?, dueDate = ?, status = ?, project = ?, team = ? WHERE task_id = ?";
    const [result] = await db.execute(query, [title, description, dueDate, status, project, team, task_id]);
    return result;
};