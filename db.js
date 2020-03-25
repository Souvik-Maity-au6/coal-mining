const mongoose = require("mongoose");



// const dbCon = async()=> {

//     const con = await mongoose.connect(process.env.MONGODB_URI.replace('<password>', process.env.MONGODB_PASSWORD), {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true
//     })
//     if(con){
//         console.log("Data base Connected Sucessfully");
//     }
// }

// dbCon();



// This data base for local purpose just commnet it when u are adding it to atlas

const dbCon = async()=> {

    const con = await mongoose.connect("mongodb://127.0.0.1:27017/Entertainment", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    if(con){
        console.log("Data base Connected Sucessfully");
    }
}

dbCon();

