import { getReminders } from "../models/reminderModel";

export const get_Reminder = async (req, res) => {
    const {user_id} = req.body;

    try {
        if (!title, !dueDate)
    {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    const isRender = getReminders(user_id);

    if (isRender) {
        res.status(201).json({
            success: true,
            message: "Info has been rendered successfully",
            user_id
        });
    }
    } catch (err) {
        console.log(err);
    }  
};