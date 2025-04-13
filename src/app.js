const express = require("express");
const http = require('http');

// const mongoose = require("mongoose");
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
const cors = require('cors');
const { initializeSocket } = require("./Utils/socket");




const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

const httpServer = http.createServer(app);

initializeSocket(httpServer);




connectDB()
    .then(() => {
        console.log("connected to the database cluster succesfully");
        httpServer.listen('7777', () => {
            console.log("server is listening on port 7777");
        })
    })
    .catch((err) => {
        console.log("There is an error while connecting to the database cluster");
    })
