const mongoose = require("mongoose");

const Schema = mongoose.Schema;

theaterSchema = new Schema({
    name: {
        type: String,
        required: [true,"Please provide the theater name"],
        trim: true
    },
    city: {
            type: Schema.Types.ObjectId,
            ref: "city"
    },
    total_seat: {
        type: Number,
        required: [true,"Please provide the total seats"],
    },
    avilable_screen: [{
        type: String,
        required: [true,"Please provide the available screen"]
    }]

});

const Theater = mongoose.model("theater", theaterSchema);
module.exports = Theater;