const routing = require("../models/userModel");
const nodemailer = require('nodemailer');

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

const createUser = async (req, res, next) => {
    const { name, email } = req.body;
    try {
        const newUser = await routing.createUserService(name, email);
        handleResponse(res, 201, "User created successfully", newUser);
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await routing.getAllUsersService();
        handleResponse(res, 200, "Users found successfully", users);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await routing.getUserByIdService(req.params.id);
        if (!user) {
            return handleResponse(res, 404, "User not found");
        }
        handleResponse(res, 200, "User found successfully", user);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    const { name, email } = req.body;
    try {
        const updatedUser = await routing.updateUserService(req.params.id, name, email);
        if (!updatedUser) {
            return handleResponse(res, 404, "User not found");
        }
        handleResponse(res, 200, "User updated successfully", updatedUser);
    } catch (error) {
        next(error);
    }
};



const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await routing.deleteUserService(req.params.id);
        if (!deletedUser) {
            return handleResponse(res, 404, "User not found");
        }
        handleResponse(res, 200, "User deleted successfully", deletedUser);
    } catch (error) {
        next(error);
    }
};

const email=async(req,res,next)=>{
    const {text}=req.body
    try {
        const sendemail=await routing.sendEmailService(text);
        if (!sendemail) {
            return handleResponse(res, 404, "Email not send");
        }
        handleResponse(res, 200, "Email sent successfully", sendemail);
       
    } catch (error) {
        next (error)
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    email
};
