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
    // theatre: [{
    //     id: {
    //         type: Schema.Types.ObjectId,
    //         ref: "theatre"
    //     }
    // }]

});

const City = mongoose.model("city", citySchema);
module.exports = City;

