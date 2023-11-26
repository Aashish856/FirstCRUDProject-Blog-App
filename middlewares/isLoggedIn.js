const jwt = require("jsonwebtoken")

function isLoggedIn(req, res, next){
    try{
        const token = req.headers.authtoken;
        // console.log(req.headers)
        const payLoad = jwt.verify(token, process.env.AUTH_SECRET)
        req.payLoad = payLoad;
        next();
    }catch(err){
        res.send("User not logged In");
    }
}

module.exports.isLoggedIn = isLoggedIn;