const{Sequelize,Model}= require("sequelize");

// const Theater = require("../models/Theater");
const sequelize = require("../db");


class Seat extends Model {}

const seatSchema ={
    // seatid:{
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    // },
    screentype: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg: "Please provide the screen type"
            }      
        },    
    },
    category: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg: "Please provide the screen type"
            }      
        },
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notNull:{
                msg: "Please provide the screen type"
            }      
        },
    },
    theater: {
        type: Sequelize.INTEGER,  
    }
};

Seat.init(seatSchema, {
    sequelize,
    tableName: "seat"
});

// const Seat = mongoose.model("seat", seatSchema);
 module.exports = Seat;