const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long']

        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long']
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    socketId: {
        type: String
    },

})
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{ expiresIn: '24h' })
    return token
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
//      A static method is a function that is part of a class 
// but does not operate on the data (instance variables/properties)
//  of a particular object (instance).
// Invocation: It is called directly on the class name (e.g., User.myStaticMethod()),
//  without needing to create an object using the new keyword.

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10)
}

const userModel=mongoose.model('user',userSchema)
module.exports = userModel






