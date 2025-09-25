import { getProjects } from "../models/projectModel";


export const get_projects = async (req, res) => {    
    try {
        const {user_id} = req.body;
        if (!title, !dueDate, !status){
            res.status(400).JSON({
                success: false,
                message: 'Something wrong with rendering projects'
            });
        }
        const project = await getProjects(user_id);
        return res.status(500).JSON({
            success: true,
            user_id
        })
    } catch (err) {

    }

}