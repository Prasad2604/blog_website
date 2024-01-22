
const User = require('../models/user.model')
const bcryptjs = require('bcryptjs');


const signup = async (req,res)=>{
    // console.log(req.body);
    const {username,email,password} = req.body;
    if(!username||!email||!password||username===''||email===''||password===''){
        return res.status(400).json({msg:"All fields are required"})
    }
    //hashing of password....
    const hashpassword = bcryptjs.hashSync(password,10);

    const newUser = new User({
        username,
        email,
        password : hashpassword,
    });

    try {
        await newUser.save();
        res.json({msg:'Signup successfull'})
    } catch (error) {
        res.status(500).json({msg:error.message});
    }

    
  
}


module.exports = {signup}