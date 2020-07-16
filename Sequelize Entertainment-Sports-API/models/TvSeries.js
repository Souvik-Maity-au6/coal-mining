const{Sequelize,Model}= require("sequelize");


const sequelize = require("../db");


class TvSeries extends Model {}

const tvSchema ={

    seriesname: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"PLease provide series name"
            }
        }
    },
    genre: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    posterimage: {
        type: Sequelize.STRING
    },
    language: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    upcomming: {
       type:Sequelize.BOOLEAN,
    },
    currentlyrunning: {
       type:Sequelize.BOOLEAN,
    },
    cast: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    writer: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"PLease provide writer"
            }
        }
    },
    producer: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"PLease provide producer"
            }
        }
       
    },
    director: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"PLease provide director"
            }
        }
       
    },
    runtime: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"PLease provide runtime"
            }
        }
       
    },
    episode: {
        type: Sequelize.INTEGER,
        required:true
    },
    imdrating: {
        type: Sequelize.FLOAT
    },
    criticsrating: {
        type: Sequelize.FLOAT
    },
    availablescreen: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    summary: {
        type: Sequelize.STRING
    },
    channelname:{
        type:Sequelize.ARRAY(Sequelize.STRING),
        allowNull:false,
        validate:{
            notNull:{
                msg:"PLease provide channel name"
            }
        }
    }
}

TvSeries.init(tvSchema,{
    sequelize,
    tableName: "tvseries"
});
module.exports = TvSeries;

// const tvModel = mongoose.model("TvSeries",tvSchema);

// module.exports=tvModel;