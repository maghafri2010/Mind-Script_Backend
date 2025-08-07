import { create_task, get_task, remove_task } from "../models/taskModel.js";



export const Add_task = async (req, res) => {
    const {title, description, dueDate, status, project, team, user_id} = req.body;
    if (!user_id) res.status(400).json({message: "There is no user with this ID!"});

    const task_id = await create_task({title, description, dueDate, status, project, team, user_id});
    res.status(201).json({message: "Task created :", task_id})
}

export const Converting = async (req, res) => {
    const {task_id, user_id, status} = req.body;

}

export const getTasks = async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({message: "User ID is required"});
    try {
        const tasks = await get_task(user_id);
        res.status(200).json({tasks});
    } catch (err) {
        res.status(500).json({message: "ERROR fetching tasks", error: err.message })
    }
}

export const removeTasks = async(req, res) => {
    const { user_id, task_id } = req.body;
    if (!user_id || !task_id) return res.status(400).json({message: "This task is not included in the DB"});
    try {
        const removed = await remove_task(user_id, task_id);
        res.status(200).json({message: "Task removed successfully", removed});
    } catch (err) {
        res.status(500).json({message: "ERROR Unable to find task"});
    }
}