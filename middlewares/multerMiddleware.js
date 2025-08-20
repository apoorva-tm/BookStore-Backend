//importing middleware
const multer =require('multer')

// 2 create storage and filename

const storage=multer.diskStorage({
    //path to store file
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    //the name in which file should be saved
    filename:(req,file,callback)=>{
        const fname=`img-${file.originalname}`
        callback(null,fname)
    },

})

const fileFilter=(req,file,callback)=>{
    if( file.mimetype=='image/png'  || file.mimetype=='image/jpg'  || file.mimetype=='image/jpeg'  ){
        callback(null,true)
        console.log('enter the filefilter');
        
    }
    else{
        callback(null,false)
        return callback(new Error("Accept only png jpg jpeg files only....."))
    }
}

const multerConfig = multer({
    storage,
    fileFilter

    
})

module.exports = multerConfig 