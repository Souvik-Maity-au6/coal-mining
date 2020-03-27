const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const showSchema = Schema({

    theater: {
        type: Schema.Types.ObjectId,
        ref: "theater"
    },
    startingDate:{
        type:Date,
        required:[true,"Please provide starting date"]
    },
    start_timing: {
        type: String,
        required:[true,"Please provide the start timing of the show like [Morning,AfterNoon,Evening,Night]"]
    },
    exact_timing: {
        type: String,
        required:[true,"Please provide the time"]  /// need to convert to string if we want to get the time not the date
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: "movie"
    }
})

const showModel = mongoose.model("show",showSchema);
module.exports = showModel;