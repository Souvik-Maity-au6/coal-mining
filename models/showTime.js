const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const showSchema = Schema({

    theater: {
        type: Schema.Types.ObjectId,
        ref: "theater"
    },
    start_timing: {
        type: String
    },
    exact_timing: {
        type: Date
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: "movie"
    }
})

const showModel = mongoose.model(showSchema, "show");
module.exports = showModel;