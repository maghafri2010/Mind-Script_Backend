import { createProject, duplicateProject, editProject, getProjects, removeProject } from "../models/projectModel.js";

export const get_projects = async (req, res) => {    
    const { user_id } = req.body;

    try {
        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: 'User id is required'
            });
        }
        const projects = await getProjects(user_id);

        res.status(200).json({
            success: true,
            projects
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false, 
            message: 'Server error' });
    }
};

export const create_project = async (req, res) => {
    const { title, description, dueDate, status, user_id } = req.body;
    try {
        if (!title || !description || !dueDate || !status || !user_id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const project = await createProject({title, description, dueDate, status, user_id});

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            project
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const remove_project = async (req, res) => {

    try {
        const {user_id, project_id} = req.body;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "There is smth wrong with User Id"
            });
        }
        if (!project_id) {
            return res.status(400).json({
                success: false,
                message: "There is smth wrong with project id"
            });
        }

        const removed = await removeProject({user_id, project_id});

        res.status(200).json({
            success: true,
            message: "Project has been removed successfully",
            removed
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const duplicate_project = async (req, res) => {

    try {
        const { project_id } = req.body;

        if (!project_id) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required"
            });
        }

        const project = await duplicateProject({project_id});

        res.status(200).json({
            success: true,
            message: "Project has been duplicated successfully",
            project
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const edit_project = async (req, res) => {
    try {
            const {title, description, dueDate, status, project_id} = req.body;

        if (!title || !description || !dueDate || !status || !project_id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        await editProject({ title, description, dueDate, status, project_id });

        res.status(201).json({
            success: true,
            message: "Project has been edited successfully",
            project_id
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
