const{Sequelize,Model}= require("sequelize");


const sequelize = require("../db");


class Sports extends Model {}
const sportSchema ={

    tournamentname: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Provide tournament name"
            }
        },
    },
    startingdate: {
        type:Sequelize.DATE,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Provide starting date"
            }
        }
    },
    timing: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Provide event timing"
            }
        }
    },
    city: {
        type: Sequelize.INTEGER,   
    },
    venue: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Provide venue"
            }
        }
    },
    sportname: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Provide Sport name"
            }
        }
    },
    ticketprice: {
        type:  Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Provide ticket Price"
            }
        }
    },
    about: {
        type: Sequelize.STRING
    },
    posterimage: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Provide the poster Image"
            }
        }
    }
}

Sports.init(sportSchema, {
    sequelize,
    tableName: "sports"
});

module.exports = Sports;