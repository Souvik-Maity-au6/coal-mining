const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const showSchema = Schema({

    theatre: [{
        tid: {
            type: Schema.Types.ObjectId,
            ref: "theatre"
        }
    }],
    start_timing: {
        type: String
    },
    exact_timing: {
        type: Date
    },
    movie: [{
        mid: {
            type: Schema.Types.ObjectId,
            ref: "movie"
        },
        mname:{
            type:String,
            ref:"movie"
        }
    }]
})

const showModel = mongoose.model(showSchema, "show");
module.exports = showModel;