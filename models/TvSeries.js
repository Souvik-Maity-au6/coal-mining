const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tvSchema = new Schema({

    seriesName: {
        type: String,
        required:true,
        trim:true
    },
    genre: [{
        type: String  
    }],
    posterImage: {
        type: String
    },
    language: [{
        type: String
    }],
    upcoming: {
        type: Boolean,
        default:false
    },
    currentlyRunning: {
        type: Boolean,
        default:false
    },
    cast: [{
        type: String
    }],
    writer: {
        type: String,
        required:true,
        trim:true
    },
    producer: {
        type: String,
        required:true,
        trim:true
    },
    director: {
        type: String,
        required:true,
        trim:true
    },
    runtime: {
        type: String,
        required:true,
        trim:true
    },
    episode: {
        type: Number,
        required:true
    },
    imdRating: {
        type: Number
    },
    criticsRating: {
        type: Number
    },
    availableScreen: [{
        type: String
    }],
    summary: {
        type: String
    },
    releaseDate:{
        type:Date
    },
    channelName:[{
        type:String,
        required: true
    }]
});

const tvModel = mongoose.model("TvSeries",tvSchema);

module.exports=tvModel;