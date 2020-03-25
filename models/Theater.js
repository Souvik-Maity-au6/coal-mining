const mongoose = require("mongoose");

const Schema = mongoose.Schema;

theaterSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    city: {
            type: Schema.Types.ObjectId,
            ref: "city"
    },
    total_seat: {
        type: Number,
        required: true
    },
    avilable_screen: [{
        type: String,
        required: true
    }]

});

const Theater = mongoose.model("theater", theaterSchema);
module.exports = Theater;