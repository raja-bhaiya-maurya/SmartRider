const express=require('express')
const userModel= require('../models/user.model')
const{validationResult}= require('express-validator')
const userService = require("../services/userService")
const blackListTokenModel= require("../models/blackListToken.model")


module.exports.userRegister= async(req,res,next)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array())
        return res.status(400).json({errors:errors.array()})
        
    }
   const{fullname,email,password}=req.body
   const isuser= await userModel.findOne({email})
   if(isuser){
       res.status(400).json({message:"user Aleady registered"})

   }
   const hashedPassword= await userModel.hashPassword(password)
   const user= await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
    email,
    password:hashedPassword
   })
 const token = user.generateAuthToken();

    res.status(201).json({ token, user });


}
module.exports.userLogin=async(req,res,next)=>{
    const error= validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    const{email,password}=req.body
    const user=await  userModel.findOne({email}).select('+password')
    if(!user){
       return res.status(400).json({message:"user is not registered"})
    }
     const isuser=  await user.comparePassword(password)
    if(!isuser){
       return res.status(400).json({message:" password is wrong"}) 
    }
    const token = user.generateAuthToken();
    res.cookie('token', token);
        res.status(200).json({token,user})


}
module.exports.userProfile=async(req,res,next)=>{
    
  res.status(200).json(req.user)  
  

}

module.exports.userLogout=async(req,res,next)=>{
   res.clearCookie('token')
   const token= req.cookies.token||req.headers.authorization.split(' ')[1]
   await blackListTokenModel.create({token})
   res.status(200).json({message:"Logged out"})
}

