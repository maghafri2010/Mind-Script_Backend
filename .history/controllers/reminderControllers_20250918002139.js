import { getReminders } from "../models/reminderModel";

export const get_Reminder = async (req, res) => {
    const {user_id} = req.body;

    if (!title, !dueDate)
    {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });

        const isRender = getReminders(user_id);
    }


}