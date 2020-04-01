const mongoose = require("mongoose");
const {sign}= require("jsonwebtoken");
const {mailConfig} =require("../sendMail");
const {hash,compare}= require("bcryptjs");
// const validator = require("validator");
const Schema = mongoose.Schema;


const userSchema = Schema({

    token: {
        type: String,
        default: null
    },
    companyEmail: {
        type: String,
        trim: true,
        sparse:true,
        lowercase: true,
        unique: true,
        required: [true, "Email required"],
        validate: {
            validator: function (v) {
                // return /^[A-Za-z._1-9]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/.test(v);
                return /^[A-Za-z._{0-9}*]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/.test(v);
            },
            message: "Please enter a valid email"
        },
        
    },
    password: {
        type: String,
        // validate: {

        //     validator: function (v) {
        //         return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/ .test(v);
        //     },
        //     message: "Please enter a valid password"
        // },
        required:[true,"Password Required"]
    },

companyName: {
    type: String,
    required: [true, "Please provide Company Name"]
},
isAuthorized:{
    type:Boolean,
    default:false,
},
panNo: {
    type: String,
   
    unique: true,
    validate: {
        validator: function (v) {
            return /([A-Z]){5}([0-9]){4}([A-Z]){1}$/.test(v);
        },
        message: "Please enter a valid pan no"
    },
    requried: [true, "Please provide Pan No"],
},
tvSeries: [{
    type: Schema.Types.ObjectId,
    
    ref: "TvSeries"
}],
movie: [{
    type: Schema.Types.ObjectId,
    default: null,
    ref: "movie"
}],
theatre: [{
    type: Schema.Types.ObjectId,
    default: null,
    ref: "theater"
}],
sport: [{
    type: Schema.Types.ObjectId,
    deault: null,
    ref: "sport"
}],
isLoggedIn:{
    type:Boolean,
    default:false
}

})
userSchema.statics.findByEmailAndPassword = async function(email, password) {
    let userObj = null;
        try{
            return new Promise(async function(resolve, reject) {
                // console.log("email:",email);
                const user = await userModel.find({ companyEmail: email })
                    //  console.log(user);
                    if (user.length === 0) return reject("Incorrect credentials");
                    userObj = user;
                    // console.log("user password :",user.password);
                    // console.log("password:",password);
                    const isMatched = await compare(password, user[0].password);
                
                    if (!isMatched) return reject("Incorrect credentials");
                    resolve(userObj);
                
            });
    }
    catch(err){
        reject(err);
    }
   
  };
userSchema.methods.createLoggedIn = async function(){
    this.isLoggedIn = true;
}  
userSchema.methods.generateToken = async function(){

    this.token = await sign({id:this._id},process.env.PRIVATE_KEY,{expiresIn:60*1});
}
userSchema.statics.generateToken = async function(){

    this.token = await sign({id:this._id},process.env.PRIVATE_KEY,{expiresIn:60*1});
}
userSchema.pre("save", async function(next) {
    var user = this;
    // Check whether password field is modified

    try{
        
        if (user.isModified("password")) {
            const hashPwd = await hash(this.password, 10)
            this.password = hashPwd;
            next()
        }
    }
    catch(err){
        // return res.send({msg:err.message});
        console.log(err);
       next(err);
    }
   
});


const userModel = mongoose.model("user", userSchema);
module.exports = userModel;