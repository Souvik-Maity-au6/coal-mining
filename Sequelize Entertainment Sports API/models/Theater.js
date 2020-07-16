const{Sequelize,Model}= require("sequelize");


const sequelize = require("../db");


class Theater extends Model {}

const theaterSchema = {
    name: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Please provide the theater name"
            }
        }
    },
    city: {
            type: Sequelize.INTEGER,
    },
    totalseat: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Please provide the total seats"
            }
        }
    },
    avilablescreen: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull:false,
        validate:{
            notNull:{
                msg:"Please provide the available screen"
            }
        }
    }

}
Theater.init(theaterSchema, {
    sequelize,
    tableName: "theater"
});

module.exports = Theater;
// const Theater = mongoose.model("theater", theaterSchema);
// module.exports = Theater;