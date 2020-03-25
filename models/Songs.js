const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const songSchema = Schema({

    sname: {
        type: String,
        required: true
    },
    singerName: {
        type: String,
        required: true
    },
    musicDirector: {
        type: String,
        required: true
    },
    lyricyst: {
        type: String,
        required: true
    },
    musicProducer: {
        type: String,
        required: true
    },
    awards: [{
        type: String
    }],
    language: {
        type: String
    },
    genre: {
        type: String
    }

});

const songModel = mongoose.model("songs",songSchema);
module.exports=songModel;