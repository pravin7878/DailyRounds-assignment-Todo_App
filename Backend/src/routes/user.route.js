const express = require("express");
const userRouter = express.Router()
const User = require("../models/User");
const { registerNewUser, authenticateUser } = require("../controlers/user.controler");

const validateRegisterBody  = require("../middelware/validateRegister")
const validateLogin = require("../middelware/validateLogin")

// get all user
userRouter.get("/" , async(req,res)=>{
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        console.log(err);
        res.status(500).json("internal server error")
    }
})

// register user
userRouter.post("/register" ,validateRegisterBody, registerNewUser);

// login user
userRouter.post("/login" ,validateLogin, authenticateUser);

module.exports = userRouter