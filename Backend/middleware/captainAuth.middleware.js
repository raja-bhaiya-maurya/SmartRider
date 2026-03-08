const captainModel= require("../models/captain.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const blackListTokenModel = require("../models/blackListToken.model")

module.exports.authCaptain=async(req,res,next)=>{
   
    const token= req.cookies.token||req.headers.authorization?.split(' ')[1]
    
    console.log(token)
    if(!token){
        return res.status(401).json({message: "unauthorized captain"})
    }
     
const isBlackListed= await blackListTokenModel.findOne({token:token})
if(isBlackListed){
    return res.status(401).json({message:"Unauthorized"})
}

    try {
        
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        const captain= await captainModel.findById(decoded._id)
        req.captain=captain
        console.log(req,req.captain)
        return next()

    } catch (error) {
        return res.status(401).json({message:"Unauthorized"})
    }
}