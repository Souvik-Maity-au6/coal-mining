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
    lyricist: {
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
    },
    album: {
        type: String,
        required:true,
        trim:true
    }

});

const songModel = mongoose.model("songs",songSchema);
module.exports=songModel;