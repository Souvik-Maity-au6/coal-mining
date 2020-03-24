var multer = require("multer");
var dotenv = require("dotenv");
dotenv.config();    
var path = require("path");
var injectFileName = function(originalname){

    var extname = path.extname(originalname);
    originalname.replace(extname,'')+"-" + Date.now();
    console.log(originalname);
    return originalname;

}
var multerConfig = {

    storage: multer.memoryStorage({
        destination:"uploads/",
        filename: function(req,file,cb){
            console.log(file);
            cb(null,injectFileName(file.originalname))
        }
    }),
    limits:{
        fileSize: 1024 *1024 *2
    
    },
    fileFilter: function(req,file,cb){


        if(file.mimetype === "image/jpeg" || file.mimetype ==="image/png")
        {
            cb(null,true);
        }
        else{
            var newError = new Error("File Type is in correct");
            newError.name="MulterError";
            cb(newError,false);
        }
    }
}

var upload = multer(multerConfig);
module.exports = upload;