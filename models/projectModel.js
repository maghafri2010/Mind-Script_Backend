import db from "../config/db.js";

export const getProjects = async (user_id) => {
  const query = "SELECT project_id, title, description, dueDate, status, user_id FROM projects WHERE user_id = ?";
  const [result] = await db.execute(query, [user_id]);
  return result;
};

export const createProject = async ({title, description, dueDate, status, user_id}) => {
  const query =
    "INSERT INTO projects (title, description, dueDate, status, user_id) VALUES (?, ?, ?, ?, ?)";
  const [result] = await db.execute(query, [
    title,
    description,
    dueDate,
    status,
    user_id,
  ]);
  return result.insertId;
};

export const removeProject = async ({user_id, project_id}) => {
  const query = "DELETE FROM projects WHERE user_id = ? AND project_id = ?";
  const [result] = await db.execute(query, [user_id, project_id]);
  return result;
};

export const duplicateProject = async ({project_id}) => {
  const query = "SELECT title, description, dueDate, status, user_id FROM projects WHERE project_id = ?";
  const [data] = await db.execute(query, [project_id]);
  if (!data.length) return null;

  const project = data[0];

  const query2 = "INSERT INTO projects (title, description, dueDate, status, user_id) VALUES (?, ?, ?, ?, ?)";
  const [result] = await db.execute(query2, [
    project.title,
    project.description,
    project.dueDate,
    project.status,
    project.user_id,
  ]);
    return { project_id: result.insertId };
};

export const editProject = async ({
  title,
  description,
  dueDate,
  status,
  project_id,
  user_id, 
}) => {
  const query = `
    UPDATE projects 
    SET title = ?, description = ?, dueDate = ?, status = ? 
    WHERE project_id = ? ${user_id ? "AND user_id = ?" : ""}
  `;

  const params = user_id
    ? [title, description, dueDate, status, project_id, user_id]
    : [title, description, dueDate, status, project_id];

  const [result] = await db.execute(query, params);

  if (result.affectedRows === 0) {
    return { success: false, message: "No project updated. Check project_id/user_id." };
  }

  return { success: true, message: "Project updated successfully" };
};

