const express = require('express');
const {userAuth} = require('../middlewares/userAuth');
const User = require('../models/user');

const profileRouter = express.Router();
profileRouter.get("/profile/view",userAuth, async (req,res) =>{
    try {
        const user = req.user;
        res.send(user);
    }
    catch (err) {
        res.status(400).send("The error is " + err.message)
    }
})
profileRouter.patch("/profile/edit",userAuth, async (req,res) =>{
    try {
        const user = req.user;
        const userObj= req.body; // all the fields that are to be changed are here
        const AllowedFields = ["firstName","lastName","age","gender","about","skills","photoUrl"];
        // There should be a data validation here also 
        const allowedFieldsObj = Object.keys(userObj).reduce((acc, key) => {
            if (AllowedFields.includes(key)) {
                acc[key] = userObj[key]; // Store key-value pairs
            }
            return acc;
        }, {});
        const afterUpdate = await User.findByIdAndUpdate({_id : user._id},allowedFieldsObj,{returnDocument : "after"});
        res.send(afterUpdate);

    } catch (error) {
        res.status(400).send("Error is :- " + error.message); 
    }
})
// profileRouter.patach("/profile/patch/passwrod") logic
// const user = req.user;
//if user doesn't exist then throw an error 
// if it does then ek aur baar usse password dalwao aur compare karo 
// if he passes that test then changed password dalwao usse aur update kar do password hash ki form me 
module.exports = profileRouter;



