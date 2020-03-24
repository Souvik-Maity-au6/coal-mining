const mongoose = require("mongoose");


const dbCon = async ()=>{
   const con = await mongoose.connect("mongodb://127.0.0.1:27017/Entertainment",{useUnifiedTopology: true,useNewUrlParser: true });
   if(con){
       console.log("Connection is set up Sucessfully");
   }
}

dbCon();
