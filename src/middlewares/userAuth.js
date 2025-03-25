const jwt = require("jsonwebtoken");
const User = require('../models/user')
const userAuth = async (req, res, next) => {
    try {


        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            throw new Error("The token is not found");
        }
        const decodedMessage = await jwt.verify(token, "SecreteKey@1234");
        const { _id } = decodedMessage;
        const user = await User.findOne({ _id });
        if (!user) {
            throw new Error("There is no user found");
        }
        req.user = user;
        next();
    }
    catch(err){
        res.status(400).send("Error :- " + err.message);
    }

}
module.exports = { userAuth };