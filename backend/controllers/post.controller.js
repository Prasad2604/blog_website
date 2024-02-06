const errorHandler = require("../middlewares/error");
const Post = require("../models/post.model");


const create = async (req,res,next) =>{
    // console.log(req.user);
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You are not allowed to create a post'))
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(403,'Please Provide all the required fields'))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9]/g,'');
    const newPost = new Post({
        ...req.body,
        slug,
        userId:req.user.id, 
    });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost)
    } catch (error) {
        next(error);
    }
}   


module.exports = {create}