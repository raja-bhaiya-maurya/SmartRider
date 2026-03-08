const mongoose= require ('mongoose')

const blackListTokenSchema= new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true

    },
   createdAt:{
       type:Date,
        default:Date.now(),
        expires:86400 //24 hrs in sec ttl
    }
})
const blackListTokenModel=mongoose.model("blacklistToken",blackListTokenSchema)
module.exports=blackListTokenModel