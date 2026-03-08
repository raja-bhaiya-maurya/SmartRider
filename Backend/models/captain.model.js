const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const captainSchema=  new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3, "the name must have at lest 3 letters"]

        },
        lastname:{
            type:String,
            minlength:[3,"the lastname must have at least 3 letters"]

        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        minlength:[3,"length of email must be greater than 3"],
        match:[/^\S+@\S+\.\S+$/,'please enter a valid mail']

    },
    password:{
        type: String,
        required:true,
        select:false,
        minlenth:[3,"the password must have 3 letters"],
        
    },
    socketId:{
        type:String
    },
    captainStatus:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,"color must be of 3 characters"]
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,"plate must be of 3 characters"]
        },
        capacity:{
            type:Number,
            required:true,
            min:[3,"capacity must be  at least 1"]
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','auto','motorcycle']
        }
    },
    location:{
        lat:{
            type:Number
           
        },
        lng:{
            type:Number
        }
    }
})

captainSchema.methods.generateAuthToken=function(){
    const token= jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token
}
captainSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
captainSchema.statics.hashPassword= async function(password){
    return  await bcrypt.hash(password,10)
}
const captainModel=mongoose.model('captain',captainSchema)
module.exports= captainModel