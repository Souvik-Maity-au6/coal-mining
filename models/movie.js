const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({

    mname: {
        type: String,
        trim: true,
        required: true
    },
    genre: [{
            type: String
    }],
    currentlyRunning: {
        type: Boolean
    },
    upcoming: {
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
    Runtime: {
        type: String
    },
    imdRating: {
        type: Number
    },
    criticsRating: {
        type: Number
    },
    avaiableScreen: [{
        type: String
    }],
    summary: {
        type: String
    },
    catagory: {
        type: String
    },
    releaseDate: {
        type: Date
    },
    threater: [{
        
            type: Schema.Types.ObjectId,
            ref: "theater"
    }]
})

const movieModel = mongoose.model("movie", movieSchema);
module.exports = movieModel;