const{Sequelize,Model}= require("sequelize");


const sequelize = require("../db");


class Events extends Model {}


const eventSchema ={

   ename:{
       type:Sequelize.STRING,
       allowNull:false,
       validate:{
        notNull:{
            msg:"Provide tournament name"
        }
    },
   },
   artist:{
       type:Sequelize.STRING,
       allowNull:false,
       validate:{
        notNull:{
            msg:"Provide tournament name"
        }
    },
   },
   city:{
       type:Sequelize.INTEGER, 
   },
   venue:{
       type:Sequelize.STRING
   },
   date:{
       type:Sequelize.DATE,
   },
   starttime:{
       type:Sequelize.STRING,
   },
   language:{
       type:Sequelize.STRING
   },
   duration:{
        type:Sequelize.STRING,
   },
   about:{
       type:Sequelize.STRING
   },
   poster:{
       type:Sequelize.STRING
   },
   agerestriction:{
       type:Sequelize.STRING
   }

};


Events.init(eventSchema, {
    sequelize,
    tableName: "events"
});

module.exports=Events;

// const eventModel = mongoose.model("songs",eventSchema);
module.exports=Events;