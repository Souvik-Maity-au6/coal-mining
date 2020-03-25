const mongoose = require("mongoose");

const Schema = mongoose.Schema;

seatSchema = new Schema({
    sreen_type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    theater: {
        type: Schema.Types.ObjectId,
        ref: "theater"
    }
});

const Seat = mongoose.model("seat", seatSchema);
module.exports = Seat;