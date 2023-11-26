
const Blog = require("../models/Blog")
const User = require("../models/User")
async function addBlog(req, res){
    try{
        if(!req.body.title || !req.body.content){
            res.send("Incomplete Blog")
            return;
        }
        const payLoad = req.payLoad;
        const user = await User.find({email : payLoad.email});
        // console.log(user[0])
        const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content,
            author: user[0]._id // Ensure you are using user._id here
        });

        // const result = await newBlog.save();
        const result = await newBlog.save();
        res.send(result);
    }catch(err){
        res.send(err);
    }
}

async function deleteAllBlogs(req, res){
    try{
        const result = await Blog.deleteMany()
        res.send(result);
    }catch(err){
        res.send(err);
    }
}

async function getAllBlogs(req, res){
    try{
        const result = await Blog.find();
        res.send(result);
    }catch(err){
        res.send(err);
    }
}

async function getMyBlogs(req, res){
    try{
        const payLoad = req.payLoad;
        const user = await User.find({email : payLoad.email})
        const data = await Blog.find({author : user[0]._id})
        res.send(data);
    }catch(err){
        res.send(err);
    }
}

async function deleteOneBlog(req, res){
    try{
        const payLoad = req.payLoad;
        const blogId = req.params.blogId;
        const blog = await Blog.find({_id : blogId})
        if(blog.length == 0){
            res.send("Wrong Blog Id");
            return;
        }
        if(blog[0].author != payLoad._id){
            res.send("You are not allowed to delete this content")
            return;
        }
        const result = await Blog.deleteOne({_id : blogId});
        res.send(result);
    }catch(err){
        res.send(err);
    }
}

async function updateBlog(req, res){
    try{
        const blogId = req.params.blogId;
        const payload = req.payLoad;
        const data = req.body.data
        const blog = await Blog.find({_id : blogId});
        if(blog.length == 0){
            res.send("Wrong Blog Id");
            return;
        }
        if(blog[0].author != payload._id){
            res.send("You are not allowed to edit this content");
            return;
        }
        const result = await Blog.updateOne({_id : blogId}, data);
        res.send(result);
        
    }catch(err){
        res.send(err);
    }
}

module.exports.addBlog = addBlog;
module.exports.deleteAllBlogs = deleteAllBlogs
module.exports.getAllBlogs = getAllBlogs
module.exports.getMyBlogs = getMyBlogs
module.exports.deleteOneBlog = deleteOneBlog
module.exports.updateBlog = updateBlog