const dotenv = require('dotenv')
dotenv.config({quiet: true})
const express = require('express')

const userRoutes= require('./routes/userRoutes')
const captainRoutes =require('./routes/captainRoutes')  


const app = express()
const port = process.env.PORT||3000
const cors = require('cors')

const connectToDb = require('./db/db')
const cookieParser = require('cookie-parser')
 app.use(cookieParser())


connectToDb()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
  res.send('hello')
})

app.use('/users',userRoutes)
app.use('/captain',captainRoutes)

module.exports = app