const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const eventSchema = Schema({

   ename:{
       type:String,
       required:[true,"Please Enter the event name"],
   },
   artist:{
       type:String,
       required:[true,"Please provide artist name"]
   },
   city:{
       type:Schema.Types.ObjectId,
       ref:"city",
   },
   venue:{
       type:String
   },
   date:{
       type:Date,
   },
   startTime:{
       type:String,
   },
   language:{
       type:String
   },
   duration:{
        type:String,
   },
   about:{
       type:String
   },
   poster:{
       type:String
   },
   ageRestriction:{
       type:String
   }

});

const eventModel = mongoose.model("events",eventSchema);
module.exports = eventModel;