import db from '../models/index.js'

const User = db.user

export const allAccess = (req, res) => {
    res.status(200).send('Public Content')
}

export const userBoard = (req, res) => {
    res.status(200).send ('User Content')
}

export const adminBoard = (req, res) => {
    res.status(200).send ('Admin Content')
}

export const moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

export const findAllUsers = async (req, res) => {
    try{
        const users = await User.find()
        .populate("roles", "-__v")
        .exec();
        
        res.status(200).json({success: true, data:users})
    }catch(error){
        res.status(500).json({success:false, message:error})
    }
}

