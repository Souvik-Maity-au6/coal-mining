const mongoose = require("mongoose");
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

})

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;