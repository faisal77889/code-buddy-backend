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
        console.log("a user connected");
    })
}
module.exports = { initializeSocket };
