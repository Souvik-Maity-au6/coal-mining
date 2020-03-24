const mongoose = require("mongoose");

const Schema = mongoose.Schema;

theatreSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    city: [{
            type: Schema.Types.ObjectId,
            ref: "city"
    }],
    total_seat: {
        type: Number,
        required: true
    },
    avilable_screen: [{
        type: String,
        required: true
    }]

});

const Theatre = mongoose.model("theatre", theatreSchema);
module.exports = Theatre;