const express = require("express");
const apiRoutes = require("./Routes/apiRoute");
const normalRoutes = require("./Routes/normalRoutes");
const dotenv = require("dotenv");
require("./db");



const app = express();
const PORT = process.env.PORT || 1234;


dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(apiRoutes);
app.use(normalRoutes);



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



app.listen(PORT,()=>{
    console.log("Server is running at port",PORT);
})