Lecture 11 notes Express Routers and more
    For the apis we don't use random naming, instead we try to group the similar apis together and then list all of this. For example - when for profile feed, view, edit we can using routes such as /profile/feed , /profile/edit ,etc.
    For this, we use express.Router - Read from the docs and understand what it is all about.
    create a folder which has the name of routes.
        add authRouter.js
        add profileRouter.js , etc.
    to import a router use const authRouter = require("/path");
    in the app.js - use app.use('/',authRouter); What server matches the path having / and suppose if authRouter route is there , then it finds it.

    To LogOut the user - authRouter.post('/logout', async (req,res) => {
        res.cookie("token",null,{
            expires : new Date(Date.now());
        })
        res.send("logged out");
    })
    // to create a /profile/edit api
    profileRouter.patch("/profile/edit",userAuth, async (req,res) =>{
        const user = req.user;
        try{
            // const data = req.body;
            // check for isallowedupdates ; 
                const isAllowedUpdates = (req) =>{
                    const allowedEditFields = [",, ....];
                    const isValid = Object.keys(req.body).every(fields => allowedEditFields.includes(fields));
                    return isValid;
                }
            // const loggedInUser = req.user; // by the middleware
            // Object.keys(req.body).forEach((loggedInUser) => ((loggedInUser[key]) = req.body[key]));
            // if it passed then use findbyIdAndUpdate({});  or await loggedInUser.save();
            // res.send("updation successfull"); or res.json({"message" : "updation successfull",data : loggedInUser});
        }catch(err){
            res.send("Something went Wrong");
        }
    })
// create a /profile/password
    profileRouter.patch()





lecture 12 notes - Logical DB query and compound indexes
    

 