const express=require('express')
const captainModel= require('../models/captain.model')
const{validationResult}= require('express-validator')
const captainService = require("../services/captainService")
const blackListTokenModel= require("../models/blackListToken.model")


module.exports.captainRegister= async(req,res,next)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array())
        return res.status(400).json({errors:errors.array()})
        
    }
   const{fullname,vehicle,location,captainStatus,email,password}=req.body
   const isuser= await captainModel.findOne({email})
   if(isuser){
       res.status(400).json({message:"user Aleady registered"})

   }
   const hashedPassword= await captainModel.hashPassword(password)
   const captain= await captainService.createCaptain({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password:hashedPassword,
    captainStatus,
    vehicle,
    location



   })
 const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });


}
module.exports.captainLogin=async(req,res,next)=>{
    const error= validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    const{email,password}=req.body
    const user=await  captainModel.findOne({email}).select('+password')
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
module.exports.captainProfile=async(req,res,next)=>{
   
  res.status(200).json({captain:req.captain})  

}

module.exports.captainLogout=async(req,res,next)=>{
   res.clearCookie('token')
   const token= req.cookies.token||req.headers.authorization.split(' ')[1]
   await blackListTokenModel.create({token})
   res.status(200).json({message:"Logged out"})
}
