const{Sequelize,Model}= require("sequelize");

const Theater = require("./Theater");
console.log(Theater);
const sequelize = require("../db");


class Movie extends Model {}


const movieSchema ={


    // movieid:{
    //     primaryKey: true,
    //     type: Sequelize.INTEGER,
    //     autoIncrement: true,
    //     defaultValue:0
    // },
    mname: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg: "Please provide the movie name"
            }      
        } 
        
    },
    genre: {
        type:Sequelize.ARRAY(Sequelize.STRING),  
    },
    currentlyrunning: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        validate:{
            notNull:{
                msg: "Please provide whether movie currently running or not"
            }      
        }, 
    },
    upcoming: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        validate:{
            notNull:{
                msg: "Please provide whether movie upcoming or currently running"
            }      
        },
    },
    posterimage: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg: "Please provide poster Image"
            }      
        },
    },
    language: {
        type:Sequelize.ARRAY(Sequelize.STRING),  
        allowNull:false,
        validate:{
            notNull:{
                msg: "Please provide the lnaguage"
            }      
        },
        defaultValue:[]
    },
    cast: {
        type:Sequelize.ARRAY(Sequelize.STRING), 
    },
    writer: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg: "Please provide the writer"
            }      
        },
    },
    producer: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg: "Please provide the producer"
            }      
        },
    },
    director: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg: "Please provide the director"
            }      
        },
    },
    runtime: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg: "Please provide the running time"
            }      
        },
    },
    imdrating: {
        type: Sequelize.FLOAT,
        
    },
    criticsrating: {
        type: Sequelize.FLOAT,   
    },
    avaiablescreen: {
        type:Sequelize.ARRAY(Sequelize.STRING), 
        allowNull:false,
        validate:{
            notNull:{
                msg: "Please provide the available screen"
            }      
        },
    },
    summary: {
        type: Sequelize.STRING,    
    },
    catagory: {
        type: Sequelize.STRING,    
    },
    releasedate: {
        type: Sequelize.DATE,
    },

    threater: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue:[null]   
    },
    censorcertificate:{
        type:Sequelize.STRING,  
    }
}


Movie.init(movieSchema, {
    sequelize,
    tableName: "movie"
});

module.exports = Movie;
// const movieModel = mongoose.model("movie", movieSchema);
// module.exports = movieModel;