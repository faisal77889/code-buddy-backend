const {Server} = require("socket.io");
const initializeSocket = (server) =>{
    const io = new Server(server,{
        cors : {
            origin : "http://localhost:5173",
            credentials : true,
        }
    })
    io.on("connection",(socket)=>{
        //handle events
        // console.log("a user connected");
        socket.on("joinChat",({userId,targetUserId})=>{
            // console.log(targetUserId);
            const roomId = [userId,targetUserId].sort().join("_");
            console.log("joined the room Id " + roomId);
            socket.join(roomId);
        });

        socket.on("sendMessage",({firstName,userId,targetUserId,text})=>{
            console.log(firstName);
            console.log(userId,targetUserId);
            console.log(text);
            const roomId = [userId,targetUserId].sort().join("_");
            io.to(roomId).emit("receivedMessage",{
                firstName,
                userId,
                targetUserId,
                text,
            })
        })

        socket.on("disconnect",()=>{
            console.log("disconnected");
        });

    })
}
module.exports = { initializeSocket };
