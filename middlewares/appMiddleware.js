const appMiddleWare =(req,res,next)=>{
    console.log("Inside App Middleware");
    next()
}
module.exports =appMiddleWare