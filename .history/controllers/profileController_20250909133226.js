import { getProfilePicture, profile_Edit, profile_Render } from "../models/userModel.js";


export const profileEdit = async(req, res) => {
    try {
        const {username, fisrtname, lastname, email, phone, id} = req.body;

        if (!username, !fisrtname, !lastname, !email, !phone, !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        } 
        const isEdit = await profile_Edit(username, fisrtname, lastname, email, phone, id);

        if (isEdit) {
            res.status(201).json({
            success: true,
            message: "Info has been edited successfully",
            userID
            });
        }
    } catch(err) {
        console.log(err);
    }
};

export const profileRender = async (req, res) => {

    try {
        const {user_id} = req.body;

    if (!user_id) {
        return res.status(400).json({
            success: false,
            message: "User ID is required"
        });
    }

    const render = await profile_Render(user_id);

    if (render) {
        return res.status(201).json({
            success: true,
            message: "Data has been rendered successfully!",
            data: render,
        });
    }  else {
      return res.status(404).json({
        success: false,
        message: "No user found with this ID",
      });
    }
    } catch (err) {
        console.log(err)
    }
    
}

export const get_Profile_Picture = async (req, res) => {
    try {            
        
        const { user_id } = req.body;

        if (!user_id)
        {
            return res.status(400).json({
            success: false,
            message: "There is no user with this ID"
            });        
        }
        const result = await getProfilePicture(user_id);
        if (result)
        {
            return res.status(201).json({
                success: true,
                message: "Picture has been rendered successfully!",
                user_id
            })
        }
    } catch (err) {
        console.log(err)
    }
}