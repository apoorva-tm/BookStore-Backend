//import dotenv file
//load .env file content into rocess.env by default
require('dotenv').config()

//const appMiddleware=require('./middlewares/appMiddleware')

//1 import  express
const express = require('express')

//5 import cors
const cors=require('cors')



//8 import route
const route=require('./router/route')

//import db
const db=require('./config/db')
//2.create a server app using express
const bookserver=express()

//6. implementing cors
bookserver.use(cors())

//7implement middleware
bookserver.use(express.json())//returns middle ware that only parses json

bookserver.use(route)
bookserver.use('/upload',express.static('./uploads'))
//3 define port
const PORT = process.env.PORT || 3000;

//4 Server listen 
bookserver.listen(PORT ,()=>{
     console.log("BOOK SERVER LISTENING ON THE PORT ",PORT);
     
})