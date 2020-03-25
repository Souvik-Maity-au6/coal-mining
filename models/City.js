const mongoose = require("mongoose");

const Schema = mongoose.Schema;

citySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },

});

const City = mongoose.model("city", citySchema);
module.exports = City;

