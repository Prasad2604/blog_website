const errorHandler = require("../middlewares/error")
const bcryptjs = require('bcryptjs')
const User  = require('../models/user.model')


const getTest = (req,res)=>{
    res.json({msg:'API is working'})
}

const signup = (req,res)=>{
    res.json({msg:'signup is working'})
}

const updateUser = async (req,res,next)=>{
    // console.log(req.user);
    if(req.user.id!=req.params.userId){
        return next(errorHandler(403,'You are not allowed to update this user'));
    }
    if(req.body.password){
        if(req.body.password.length <6){
            return next(errorHandler(400,'Password length must be atleast 6 charecters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password,10);
    }
    

    if(req.body.username){
        if(req.body.username.length<7 || req.body.username.length>20){
            return next(errorHandler(400,'Username must be between 7 and 20 charecters'));   
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400,'Username cannot include white-spaces'));
        }
        if(req.body.username!=req.body.username.toLowerCase()){
            return next(errorHandler(400,'Username must be lowercase'));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){         //checking for any special charecters in the username
            return next(errorHandler(400,'Username can only contain letters and numbers'));
        }
    }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    profilePicture:req.body.profilePicture,
                    password:req.body.password,
                },
            },{new:true}); //will only pass if the fields are new;
            const {password,...rest} = updatedUser._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error);
        }
    }
    

    const deleteUser = async (req,res,next)=>{
        // console.log(req.user);
        if(req.user.id!=req.params.userId){
            return next(errorHandler(403,'You are not allowed to update this user'));
        }
        try {
            await User.findByIdAndDelete(req.params.userId);
            
            res.status(200).json('User Deleted SuccessFully');
            
        } catch (error) {
            next(error);
        }
        
    }


    




module.exports = {getTest,signup,updateUser,deleteUser}