const validator = require("validator");

const validateSignUpData = (userObj,isSignUp) => {
    const allowedFields = ["firstName", "lastName", "emailId", "password"];
    
    // Check if any extra fields exist
    const { firstName, lastName, emailId, password } = userObj;
    const receivedFields = Object.keys(userObj);
    const extraFields = receivedFields.filter(field => !allowedFields.includes(field));
    if(isSignUp){
        if (extraFields.length > 0) {
            throw new Error(`Invalid fields detected: ${extraFields.join(", ")}`);
        }
        if (!firstName || firstName.length < 3) {
            throw new Error("Please enter firstName correctly");
        }
        if (!lastName || lastName.length < 3) {
            throw new Error("Your last Name is invalid");
        }
    } 
    if (!validator.isEmail(emailId)) {
        throw new Error("Please try a different Email Id");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong Password");
    }
};

module.exports = validateSignUpData;
