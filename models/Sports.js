const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sportSchema = new Schema({

    tournamentName: {
        type: String,
        required:[true,"Provide tournament name"],
        trim:true
    },
    startingDate: {
        type: Date,
        required:[true,"Provide starting date"]
    },
    timing: {
        type: String,
        required:[true,"Provide event timing"]
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "city"
    },
    venue: {
        type: String,
        required:[true,"Provide venue"]
    },
    sportName: {
        type: String,
        required:[true,"Provide Sport name"]
    },
    ticketPrice: {
        type: Number,
        required:[true,"Provide ticket Price"]
    },
    about: {
        type: String
    },
    posterImage: {
        type: String,
        required:[true,"Provide the poster Image"]
    }
})

const sportModel = mongoose.model("sport",sportSchema);
module.exports=sportModel;