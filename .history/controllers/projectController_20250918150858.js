import { getProjects } from "../models/projectModel";


export const get_projects = async (req, res) => {    
    try {
        const {title, dueDate, status} = req.body;
        if (!title, !dueDate, !status){
            res.status(400).JSON({
                success: false,
                message: 'Something wrong with rendering projects'
            });
        }
        const project = await getProjects()
        return res.status(500).JSON({
            success: true,
            user_id
        })
    } catch (err) {

    }

}