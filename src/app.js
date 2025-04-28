const express = require("express");
const http = require('http');
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
const cors = require('cors');
const { initializeSocket } = require("./Utils/socket");

const app = express();

// Set up PORT, ensuring it listens to Render's environment variable
const PORT = process.env.PORT || 7777; // PORT setup here

// CORS setup (for local development, update when deploying)
app.use(cors({
    origin: "http://localhost:5173",  // Change this to your frontend URL for production (e.g., Render URL)
    credentials: true, // Allow credentials (cookies, headers)
}));

// Middleware to parse cookies and JSON data from requests
app.use(cookieParser());
app.use(express.json()); // JSON body parsing middleware (important for POST requests)

// Routes
            //new added 
            app.get('/',(req,res)=>{
                res.send({
                    activeStatus:true,
                    error:false
                })
            })

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// **Home Route** - Accessible at '/'


// Create an HTTP server for handling sockets
const httpServer = http.createServer(app);

// Initialize socket.io (if you're using websockets)
initializeSocket(httpServer);

// Connect to the database and start the server
connectDB()
    .then(() => {
        console.log("connected to the database cluster successfully");

        // Start listening on the configured port
        httpServer.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("There is an error while connecting to the database cluster:", err);
    });
