//import mongoose
const mongoose=require('mongoose')
const connectionString =process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log('server is connected to mongodb');
    
}).catch((err)=>{
    console.log("MongoDB connection error",err);
    
})