
const User = require('../models/user.model')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require('../middlewares/error')



const signup = async (req,res,next)=>{
    // console.log(req.body);
    const {username,email,password} = req.body;
    if(!username||!email||!password||username===''||email===''||password===''){
        // return res.status(400).json({msg:"All fields are required"})
        next(errorHandler(400,'All fields are required'));
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
        // res.status(500).json({msg:error.message});
        next(error);
    }

    
  
}

const signin = async (req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password || email===''||password===''){
        next(errorHandler(400,'All fields are required'));
    }

    try {
        const user = await User.findOne({email});
        
        if(!user){
            return next(errorHandler(404,'User not found'))
        }

        const validPassword = bcryptjs.compareSync(password,user.password);
        if(!validPassword){
            return next(errorHandler(404,'Invalid Password'));
        }
        const token = jwt.sign(
            {id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET
        );
        
        const {password:pass,...rest} = user._doc;

        res.status(200).cookie('access_token',token,{
            httpOnly: true}).json(rest)

    } catch (error) {
        next(error)
    }

}

const google = async (req,res,next)=>{
    const {email,name,googlePhotoUrl} = req.body;

    try {
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET);
            const {password,...rest} = user._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly:true,

            }).json(rest);
        }
        else{
            const generatePassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword,10);
            const newUser = new User({
                username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),  //Prasad Gujar -> prasadgujar4567
                email,
                password:hashedPassword,
                profilePicture:googlePhotoUrl,

            });
            await newUser.save();
            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const {password,...rest} = newUser._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly:true,
            }).json(rest);
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {signup,signin,google}