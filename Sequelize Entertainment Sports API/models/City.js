const{Sequelize,Model}= require("sequelize");


const sequelize = require("../db");


class City extends Model {}


const citySchema ={

    // cityid:{
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    // },
    name: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Please Provide City Name"
            }
        }
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg:"Please Provide state"
            }
        }
    },

}

City.init(citySchema, {
    sequelize,
    tableName: "city"
});

module.exports=City;
// const City = mongoose.model("city", citySchema);
// module.exports = City;

