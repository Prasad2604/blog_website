const express = require('express')
const mongoose = require('mongoose') 
require('dotenv').config()
const app = express()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connected to db')
}).catch((err)=>{
    console.log(err);
});



app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})