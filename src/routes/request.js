const express = require('express');
const {userAuth} = require('../middlewares/userAuth');
const User = require('../models/user');
const ConnectionRequest = require('../models/connections');


const requestRouter = express.Router();
requestRouter.post("/request/:status/:toUserId",userAuth, async (req,res) =>{
    try {
        const fromUserId = req.user._id; // Logged-in user's ID from request body
        const status = req.params.status; // Status from route parameters
        const toUserId = req.params.toUserId; // Target user ID from route parameters

        // Validate `toUserId`
        const isValidUserId = await User.exists({ _id: toUserId });
        if (!isValidUserId) {
            return res.status(404).send("The target user does not exist in the database.");
        }

        // Validate `status`
        const validStatuses = ["interested", "ignored"];
        if (!validStatuses.includes(status)) {
            return res.status(400).send("Invalid status value provided.");
        }


        const doRequestExist = await ConnectionRequest.findOne({
            $or : [
                {fromUserId , toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
        })
        if(doRequestExist){
            throw new Error("The Request already exists");
        }
        if(fromUserId.equals(toUserId)){
            throw new Error("The request is invalid");
        }

        // Create a new connection request
        const newConnectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        // Save to the database
        const data = await newConnectionRequest.save();

        res.status(201).json({
            message : "connection added successfully",
            data
        });
    } catch (err) {
        res.status(500).send("An error occurred: " + err.message);
    }
})
// for all the pending interested states we want the api 
requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res) =>{
    try{
        const loggedInUser = req.user;
        const status = req.params.status;
        const requestId = req.params.requestId;
        const AllowedStatus = ["accepted","rejected"];
        if(!AllowedStatus.includes(status)){
            throw new Error("The status that you are trying is invalid");
        }
        const connections = await ConnectionRequest.findOne({
            _id : requestId,
            status : "interested"
        })
        if(!connections){
            throw new Error("There is something wrong with your request");
        }
        connections.status = status;
        await connections.save();
        res.send(connections);


    }catch(err){
        res.status(400).send("An error occured :" + err.message);
    }
})
module.exports = requestRouter;