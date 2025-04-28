const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://faisal77889:2l7aGTdj0Wc9Idjl@firstcluster.aaq3r.mongodb.net/Helloworld',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);  // Exit the process if MongoDB connection fails
    }
};

module.exports = connectDB;

// as mongoose.connect will connect to the cluster provided  but after a / we have writtten the helloworld implying that we want to create a database with the number of helloworld inside our given cluster
// Note that mongoose.connect() function will return a promise hence we are using async and await for handling the promises created by mongoose.connect();

// connectDB()
// .then(()=>{
//     console.log("Succesfully connected to the database cluster");
// })
// .catch((err) =>{
//     console.log("Failed to connect to the database cluster");
// })

// Note that the above method for connecting to the database is quite wrong as first our server will be loaded in this case and then the database connection is made. so if the user wants to access something from that database then it will show an error. hence we need to first connect to the database and then we will have to start the server . For this we have to export the connectDB function in the app.js and then use it there .

   
// const {Schema} = mongoose;
// const userSchema = new Schema({
//     firstName : String,a
//     lastName : String,
//     emailId : String,
//     PhoneNum : Number
// })
