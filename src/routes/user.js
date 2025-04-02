const express = require("express");
const {userAuth} = require('../middlewares/userAuth');
const ConnectionRequest = require("../models/connections")


const userRouter = express.Router();
// get the list of the connection request which has come to the logged in user
userRouter.get("/user/pending-request",userAuth, async(req,res) =>{
    try {
        const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({
           toUserId : loggedInUser._id,
           status : "interested" 
        }).populate("fromUserId",["firstName","lastName"]);
        res.send(connections);
        
    } catch (error) {
        res.status(400).send("An error occured : " + error.message);
    }

})
// get all the connections of the loggedInUser
userRouter.get("/user/connections",userAuth,async (req,res) =>{
    try {
        const loggedInUser = req.user;
        const connectionWithUser = await ConnectionRequest.find({
            $or : [
                {
                    fromUserId : loggedInUser._id,
                },
                {
                    toUserId : loggedInUser._id,
                }
            ],
            status : "accepted"

        })
        .populate("fromUserId",["firstName","lastName"])
        .populate("toUserId",["firstName","lastName"]);

        const connections = connectionWithUser.map((connection) => {
            if(connection.fromUserId._id.toString() === loggedInUser._id.toString()){
                return connection.toUserId;
            }
            return connection.fromUserId;
        })

        res.send(connections);
    } catch (error) {
        res.status(400).send("An error occured : " + error.message);
    }

})
module.exports = userRouter;