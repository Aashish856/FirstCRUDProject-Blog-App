const User = require("../models/User")

async function getAllUser(req, res){
    try{
        const result = await User.find();
        res.send(result);
    }catch(err){
        res.send(err);
    }
}


async function deleteAllUser(req, res){
    try{
        const result = await User.deleteMany();
        res.send(result);
    }catch(err){
        res.send(err);
    }
}

module.exports.getAllUser = getAllUser;
module.exports.deleteAllUser = deleteAllUser