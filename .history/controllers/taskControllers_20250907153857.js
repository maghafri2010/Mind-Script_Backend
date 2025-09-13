import db from "../config/db.js";
import { create_task, duplicate_task, edit_task, get_task, remove_task } from "../models/taskModel.js";

export const Add_task = async (req, res) => {
    try {
        const {title, description, dueDate, status, project, team, user_id} = req.body;
        
        if (!user_id) {
            console.error("Invalid user_id:", user_id);

            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required"
            });
        }

        const task_id = await create_task({title, description, dueDate, status, project, team, user_id});
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task_id
        });
    } catch (error) {
        console.error('Add task error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const Converting = async (req, res) => {
    try {
        const {task_id, user_id, status} = req.body;
        
        // Add your conversion logic here
        res.status(200).json({
            success: true,
            message: "Task status updated successfully"
        });
    } catch (error) {
        console.error('Converting error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getTasks = async (req, res) => {
    try {
        const { user_id } = req.body;
        
        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const tasks = await get_task(user_id);
        console.log("Tasks for user", user_id, ":", tasks);
        res.status(200).json({
            success: true,
            tasks
        });
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching tasks",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const removeTasks = async(req, res) => {
    try {
        const { user_id, task_id } = req.body;
        
        if (!user_id || !task_id) {
            return res.status(400).json({
                success: false,
                message: "User ID and Task ID are required"
            });
        }

        const removed = await remove_task(user_id, task_id);
        res.status(200).json({
            success: true,
            message: "Task removed successfully",
            removed
        });
    } catch (error) {
        console.error('Remove task error:', error);
        res.status(500).json({
            success: false,
            message: "Error removing task",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const duplicateTasks = async (req, res) => {
    try {
        const { task_id } = req.body;
        const task = await duplicate_task({task_id});
        res.status(201).json({
            success: true,
            message: "Task duplicated successfully",
            task_id
        });


    } catch (err) {
        console.log("Duplicated task error: ",err);
        res.status(500).json({
            success: false,
            message: "Error duplicating task"
        });
    }
};

export const editTasks = async (req, res) => {
    const {title, description, dueDate, status, project, team, task_id} = req.body;

    try {
        const result = await edit_task({title, description, dueDate, status, project, team, task_id});
        res.status(201).json({
            success: true,
            message: "Task has been edited successfully",
            task_id
        });
    } catch (err) {
        console.log("Editing task error: ",err);
        res.status(500).json({
            success: false,
            message: "Error editing task"
        });
    }
};

