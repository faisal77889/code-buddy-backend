const mongoose = require("mongoose");
const connection = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Types.ObjectId,
        required : true,
    },
    toUserId : {
        type : mongoose.Types.ObjectId,
        required : true,
    },
    status : {
        type : String,
        enum : ["accepted","rejected","interested","not-interested"],
        required : true,
    }
},
{
    timestamps : true,
}
);
const ConnectionRequest = new mongoose.model("connectionRequest",connection);
module.exports = ConnectionRequest;