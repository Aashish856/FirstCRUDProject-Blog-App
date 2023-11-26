const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function login(req, res){
    try{
        if(!req.body.email || !req.body.password){
            res.send("Enter all details");
            return;
        }
        const existingUser = await User.find({email : req.body.email})

        if(existingUser.length == 0){
            res.send("User does not exist with this email Id")
            return;
        }

        const correctPass = await bcrypt.compare(req.body.password, existingUser[0].password);
        if(!correctPass){
            res.send("Incorrect Password");
            return;
        }

        const payLoad = {
            email : req.body.email,
            _id : existingUser[0]._id,
            role : existingUser[0].role
        }
        // console.log(payLoad)
        const token = jwt.sign(payLoad, process.env.AUTH_SECRET, {expiresIn : "1h"})
        res.send(token);
        return;
    }catch(err){
        res.send(err)
        return;
    }
}

async function signUp(req, res){
    try{
        if(!req.body.name || !req.body.email || !req.body.password){
            res.send("Enter all details")
            return;
        }
        if(!req.body.role){
            req.body.role = "user"
        }
        if(req.body.role == "admin"){
            if(!req.body.adminPass){
                res.send("Enter Admin Pass to signup as admin");
                return;
            }
            if(req.body.adminPass != process.env.ADMINPASS){
                res.send("Admin Pass is wrong")
                return;
            }
        }
        const existingUser = await User.find({email : req.body.email});
        if(existingUser.length != 0){
            res.send("User already exist with this email id");
            return;
        }

        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const newUserObj = {
            name : req.body.name,
            email : req.body.email,
            password : hashedPass,
            role : req.body.role
        }
        // console.log(newUserObj)
        const newUser = new User(newUserObj);
        const result = await newUser.save();
        res.send(result);
        return;
    }catch(err){
        res.send(err);
    }
}

module.exports.login = login
module.exports.signUp = signUp