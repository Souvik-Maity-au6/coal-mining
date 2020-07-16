const{Sequelize,Model}= require("sequelize");
const Movie = require("../models/Movie")

const sequelize = require("../db");

class ShowTime extends Model {}
const showSchema ={


    // showTimeid:{
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    // },
    theater: {
        type: Sequelize.INTEGER,
    },
    startingdate:{
        type:Sequelize.DATE,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Please provide starting date"
            }
        }
    },
    starttiming: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Please provide the start timing of the show like [Morning,AfterNoon,Evening,Night]"
            }
        }
    },
    exacttiming: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Please provide the time"
            }
        }  /// need to convert to string if we want to get the time not the date
    },
    movie: {
        type: Sequelize.INTEGER,
    }
}
ShowTime.init(showSchema, {
    sequelize,
    tableName: "showTime"
});
// const showModel = mongoose.model("show",showSchema);
module.exports = ShowTime;