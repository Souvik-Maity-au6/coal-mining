const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const seatSchema = new Schema({
    screen_type: {
        type: String,
        required: [true,"Please provide the screen type"]
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true,"Please provide the seat price"]
    },
    theater: {
        type: Schema.Types.ObjectId,
        ref: "theater"
    }
});

const Seat = mongoose.model("seat", seatSchema);
module.exports = Seat;