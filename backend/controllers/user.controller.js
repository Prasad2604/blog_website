

const getTest = (req,res)=>{
    res.json({msg:'API is working'})
}

const signup = (req,res)=>{
    res.json({msg:'signup is working'})
}


module.exports = {getTest,signup}