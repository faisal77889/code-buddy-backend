const mongoose = require("mongoose");
const connection = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true,
    },
    toUserId : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true,
    },
    status : {
        type : String,
        enum : ["accepted","rejected","interested","ignored"],
        required : true,
    }
},
{
    timestamps : true,
}
);
const ConnectionRequest = new mongoose.model("connectionRequest",connection);
module.exports = ConnectionRequest;