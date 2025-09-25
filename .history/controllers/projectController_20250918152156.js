import { getProjects } from "../models/projectModel.js";


export const get_projects = async (req, res) => {    
    try {
        const {user_id} = req.body;
        if (!user_id){
            return res.status(400).JSON({
                success: false,
                message: 'Something wrong with rendering projects'
            });
        }
        const project = await getProjects(user_id);
        res.status(200).JSON({
            success: true,
            user_id
        })
    } catch (err) {
        console.log(err);
    }

}