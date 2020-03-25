const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tvSchema = new Schema({

    seriesName: {
        type: String,
        required:true,
        trim:true
    },
    genre: {
        type: String // check genere whether it should be array or singleton
    },
    posterImage: {
        type: String
    },
    language: [{
        type: String
    }],
    commingSoon: {
        type: Date
    },
    currentRunning: {
        type: Date
    },
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
    hours: {
        type: String
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
    channelName:{
        type:String // please check whether channelName should be array or single 
    }
});

const tvModel = mongoose.model("TvSeries",tvSchema);

module.exports=tvModel;