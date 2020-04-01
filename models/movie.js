const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({

    mname: {
        type: String,
        trim: true,
        required: [true,"Please provide the movie name"]
    },
    genre: [{
            type: String,
           
    }],
    currentlyRunning: {
        type: Boolean,
        required:[true,"Please provide whether movie currently running or not"]
    },
    upcoming: {
        type: Boolean,
        required:[true,"Please provide whether movie upcoming or currently running"]
    },
    posterImage: {
        type: String,
        required:[true,"Please provide poster Image"]
    },
    language: [{
        type: String,
        required:[true,"Please provide the lnaguage"]
    }],
    cast: [{
        type: String,
    }],
    writer: {
        type: String,
        required:[true,"Please provide the writer"]
    },
    producer: {
        type: String,
        required:[true,"Please provide the producer"]
    },
    director: {
        type: String,
        required:[true,"Please provide the director"]
    },
    Runtime: {
        type: String,
        required:[true,"Please provide the running time"]
    },
    imdRating: {
        type: Number,
        
    },
    criticsRating: {
        type: Number
    },
    avaiableScreen: [{
        type: String,
        required:[true,"Please provide the available screen"]
    }],
    summary: {
        type: String
    },
    catagory: {
        type: String
    },
    releaseDate: {
        type: Date,
    },
    theater: [{
        
            type: Schema.Types.ObjectId,
            ref: "theater"
    }],
    censorCertificate:{
        type:String
    }
})

const movieModel = mongoose.model("movie", movieSchema);
module.exports = movieModel;