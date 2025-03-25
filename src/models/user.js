const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required : true,
    },
    lastName : {
        type: String,
        required : true,
    },
    emailId : {
        type: String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Error with Email Id ");
            }
        }

        
    } ,
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Your password is not strong");
            }
        }
    },
    age : {
        type : Number,
        min : 18,

    },
    gender : {
        type : String,
        validate(value){
            if(!(["Male","Female"].includes(value))){
                throw new Error("you have entered an invalid data");
    
            }
        }
    },
    about : {
        type : String,
        default : "Tell us about your self in detail",
        maxLength : 100,

    },
    skills : {
        type: Array,

    },
    photoUrl : {
        type : String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Wrong data type ");
            }
        }
    }

},
{
    timestamps : true,
});

const User = mongoose.model("User",UserSchema);
module.exports = User;