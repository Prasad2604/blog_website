const express = require('express')
const mongoose = require('mongoose') 
require('dotenv').config()
const app = express()
const testrouter = require('./routes/user.route')
const authRoutes = require('./routes/auth.route')
const postRoutes = require('./routes/post.route')
const cookieParser = require('cookie-parser')


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connected to db')
}).catch((err)=>{
    console.log(err);
});

app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

// app.get('/test',(req,res)=>{
//     res.json({message:"test api is working"});
// })
app.use('/api/user',testrouter)
app.use('/api/auth',authRoutes)
app.use('/api/post',postRoutes)
// app.use('/api/comment',commentRoutes)

//error middleware

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode||500;
    const message = err.message||"Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})