const express = require("express");

const apiRoutes = require("./Routes/apiRoute");
const dotenv = require("dotenv");
dotenv.config();
const a = process.env.PORT || 1234;
require("./db");
const app = express();
app.use(express.json());
 app.use(express.urlencoded({extended:true}));
app.use(apiRoutes);



app.use(function(err,req,res,next){

    if(err.name ==="MulterError"){
        return res.status(400).send(err.message);
    }
    else if(err.name ==="ValidationError"){
        return res.send(err.message);
    }
    
})


app.post("/",(req,res)=>{
    console.log(req.body);
})
app.listen(a,()=>{
    console.log("Server is running at port"+a);
})