const express = require("express");

// const mongoose = require("mongoose");
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
const cors = require('cors')



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



// app.post('/signup', async (req, res) => {
    
//     // const userObj = {
//     //     firstName : "Deepika",
//     //     lastName : "Padukone",
//     //     emailId : "deepika@padukone.com",
//     //     password : "deepika123"
//     // }
//     // const user = new User(userObj);
//     // await user.save(user);
//     // res.send("user added succesfully");

// })
// NOTE - This is the login page for the user and hence getting the profile information 
// to login the database of the user 
// app.post('/login', async (req,res) => {
//     // get the username and password 
//     const {username, password} = req.body;
//     // give the details if it matches the database from the mongodb document 
//     try{
//         const user = await User.findOne({username : username});
//         if(!user){
//             res.status(400).send("The credentials do not match");

//         }
//         if(user.password != password){
//             res.status(400).send("The credentials do not match ");
//         }
//         res.send(user);

//     }
//     catch(err){
//         console.log("The credentials of the user do not match");
//         res.send("the credentials do not match that you provided");
//     }

// })
// To read the data from the database using the feed api
// to login the user  
// step 1 - get the userId and the password 
//step 2 - verify if the user is in the database
// if not valid user present, then throw an error
// if valid username, then check for the password
// if password fails to match, then send an error
// if password matches, then send in the required response

// app.post('/login', async (req, res) => {
    
// })

// app.get('/profile',userAuth, async (req, res) => {
//     // const {emailId} = req.body;
    
    
// })




connectDB()
    .then(() => {
        console.log("connected to the database cluster succesfully");
        app.listen('7777', () => {
            console.log("server is listening on port 7777");
        })
    })
    .catch((err) => {
        console.log("There is an error while connecting to the database cluster");
    })
