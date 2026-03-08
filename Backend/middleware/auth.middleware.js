const userModel= require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const blackListTokenModel = require("../models/blackListToken.model")

module.exports.authUser=async(req,res,next)=>{
   
    const token= req.cookies.token||req.headers.authorization?.split(' ')[1]
    
    console.log(token)
    if(!token){
        return res.status(401).json({message: "unauthorized user"})
    }
     
const isBlackListed= await blackListTokenModel.findOne({token:token})
if(isBlackListed){
    return res.status(401).json({message:"Unauthorized"})
}

    try {
        
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        const user= await userModel.findById(decoded._id)
        req.user=user
        console.log(req,req.user)
        return next()

    } catch (error) {
        return res.status(401).json({message:"Unauthorized"})
    }
}