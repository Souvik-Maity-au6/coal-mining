const mongoose = require("mongoose");



// const dbCon = async()=> {

//     console.log(process.env.MONGODB_PASSWORD);
//     console.log(process.env.MONGODB_URI.replace('<password>', process.env.MONGODB_PASSWORD));
//     const con = await mongoose.connect(process.env.MONGODB_URI.replace('<password>', process.env.MONGODB_PASSWORD), {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true
//     })
//     console.log(con);
//     if(con){
//         console.log("Data base Connected Sucessfully");
//     }
// }

// dbCon();



mongoose.connect(process.env.MONGODB_URI.replace('<password>', process.env.MONGODB_PASSWORD), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(function () {
    console.log('Database connected successfully')
}).catch(function (err) {
    console.log(err)
})