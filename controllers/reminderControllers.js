import { getReminders } from "../models/reminderModel.js";

export const get_Reminder = async (req, res) => {
    const {user_id} = req.body;

    try {
        if (!user_id)
    {
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

