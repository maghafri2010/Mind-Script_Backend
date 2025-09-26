import { createReminder, duplicateReminder, editReminder, getReminders, removeReminder } from "../models/reminderModel.js";

export const get_Reminder = async (req, res) => {
    const {user_id} = req.body;

    try {
        if (!user_id) {
        return res.status(400).json({
            success: false,
            message: "User id is required"
        });
    }
    const reminders = await getReminders(user_id);

    
    return res.status(201).json({
        success: true,
        reminders
    });
    
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }  
};



export const create_reminder = async (req, res) => {
    const {title, description, dueDate, status, user_id} = req.body;
    try {
        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "There is smth wrong with User Id"
            });
        }
        if (!title, !description, !dueDate, !status, !user_id) {
            return res.status(400).json({
                success: false,
                message: "data is required"
            });
        }
        const reminder = await createReminder({title, description, dueDate, status, user_id});
        res.status(201).json({
            success: true,
            message: "Reminder created successfully",
            reminder
        });
    }catch (err) {
        console.log(err);
    }
}

export const remove_reminder = async (req, res) => {
    try {
        const {user_id, reminder_id} = req.body;
        
        if (!user_id) {
            return res.status(400).json({
                success: false, 
                message: "There is someyhing wrong with user id"
            });
        }
        if (!reminder_id) {
            return res.status(400).json({
                success: false,
                message: "There is smth wrong with reminder id"
            });
        }
        
        const removed = await removeReminder({user_id, reminder_id});
            
        res.status(200).json({
            success: true,
            message: "Reminder has been removed successfully",
            removed
        });
    } catch (err) {
        console.log(err)
    };
}

export const duplicate_reminder = async (req, res) => {
    try {
        const {reminder_id} = req.body;
        if (!reminder_id) {
            return res.status(400).json({
                success: false,
                message: "There is smth wrong with Reminder Id"
            });
        }
        
        const reminder = await duplicateReminder({reminder_id});
        
        res.status(200).json({
            success: true,
            message: "Reminder has been duplicated successfully",
            reminder
        });
        
        
    } catch (err) {
        console.log(err);
    }
}

export const edit_reminder = async (req, res) => {
    try {
            const {title, description, dueDate, status, reminder_id} = req.body;

        const result = await editReminder({title, description, dueDate, status, reminder_id});
        res.status(201).json({
            success: true,
            message: "Reminder has been edited successfully",
            reminder_id
        });
    } catch (err) {
        console.log(err)
    }
}
