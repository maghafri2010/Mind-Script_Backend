import { getProjects } from "../models/projectModel.js";


export const get_projects = async (req, res) => {    
    const {user_id} = req.body;
    
    try {
        if (!user_id){
            return res.status(400).json({
                success: false,
                message: 'Something wrong with rendering projects'
            });
        }
        const project = await getProjects(user_id);
        res.status(200).json({
            success: true,
            user_id
        })
    } catch (err) {
        console.log(err);
    }

}