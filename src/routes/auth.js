const express = require('express');
const authRouter = express.Router();
const validateSignUpData = require("../Utils/validateSignUpData");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

authRouter.post("/signup", async (req,res) =>{
    
    // we will have to do api level validation on this 

    try {
        const userObj = req.body;

        // checking the validation of the data using api level validations
        validateSignUpData(userObj, true);
        const { firstName, lastName, emailId, password } = userObj;
        // encrypt the password to password hash

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
        const userAdded = await user.save();
        const token = jwt.sign({ _id: userAdded._id }, "SecreteKey@1234");
        res.cookie("token", token);
        res.send(userAdded);
    }
    catch (err) {
        res.status(400).send("Something went wrong" + err.message);
    }
})
authRouter.post("/login", async (req,res) => {
    try {
        // validate the data
        validateSignUpData(req.body, false);
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("The credentials do not match");
        }
        isPasswordValid = await bcrypt.compare(password, user.password); // password input and password hash
        if (!isPasswordValid) {
            throw new Error("The credentials do not match");
        }
        // cookie create karke send karni hai
        // create karo json web token and then give this value to the cookie
        const token = jwt.sign({ _id: user._id }, "SecreteKey@1234");
        res.cookie("token", token);
        res.send(user);
    } catch (error) {
        res.status(400).send("Error : " + error.message);

    }
})
// logout logic should be written here 
authRouter.post("/logout",async (req,res) => {
    // cleaning activities logic should be written over here 
    res.cookie("token",null,{
        expires : new Date(Date.now())
    });
    res.send("Logged Out succesfully");
})
module.exports = authRouter;