const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sportSchema = new Schema({

    tournamentName: {
        type: String,
        required:true,
        trim:true
    },
    startingDate: {
        type: Date,
        required:true,
    },
    timing: {
        type: String,
        required:true,
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "city"
    },
    venue: {
        type: String,
        required:true
    },
    sportName: {
        type: String,
        required:true
    },
    ticketPrice: {
        type: Number,
        required:true
    },
    about: {
        type: String
    },
    posterImage: {
        type: String,
        required:true
    }
})

const sportModel = mongoose.model("sport",sportSchema);
module.exports=sportModel;