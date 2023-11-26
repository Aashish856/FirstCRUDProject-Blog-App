function isAdmin(req, res, next){
    try{
        // console.log(req.payLoad)
        if(req.payLoad.role == 'admin'){
            next();
        }else{
            res.send("Cannot perform the action, U are not an Admin")
        }
    }catch(err){
        res.send("Cannot perform the action, U are not an Admin")
    }
}

module.exports.isAdmin = isAdmin