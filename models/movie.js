const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({

    mname: {
        type: String,
        trim: true,
        required: true
    },
    genre: {
        type: String,
        trim: true,
        required: true
    },
    currentlyRunning: {
        type: Boolean
    },
    upcomming: {
        type: Boolean
    },
    posterImage: {
        type: String
    },
    language: [{
        type: String
    }],
    cast: [{
        type: String
    }],
    writer: {
        type: String
    },
    producer: {
        type: String
    },
    director: {
        type: String
    },
    Runtime: String,
    imdRating: Number,
    criticsRating: Number,
    avaiableScreen: [{
        type: String
    }],
    summary: [{
        type: String
    }],
    catagory: {
        type: String
    },
    releaseDate: Date,
    threatre: [{
        tid: {
            type: Schema.Types.ObjectId,
            ref: "theatre"
        },
        tname: {
            type: String,
            ref: "theatre"
        }
    }]
})

const movieModel = mongoose.model("movie", movieSchema);
module.exports = movieModel;