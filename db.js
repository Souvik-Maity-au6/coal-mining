const mongoose = require("mongoose");



const dbCon = async()=> {

    const con = await mongoose.connect(process.env.MONGODB_URI.replace('<password>', process.env.MONGODB_PASSWORD), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    if(con){
        console.log("Data base Connected Sucessfully");
    }
}

dbCon();
