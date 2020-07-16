
const cloudinary = require("../cloudinary");
const Sequelize = require("sequelize");
const movieModel = require("../models/Movie");
const cityModel = require("../models/City");
const theaterModel = require("../models/Theater");
const seatModel = require("../models/Seat");
const showModel = require("../models/showTime");
const userModel = require("../models/User");
const sportModel = require("../models/Sports");
const eventModel = require("../models/Event");
const tvModel = require("../models/TvSeries");
const convert = require("../converter");
const {hash,compare} = require("bcryptjs");
const {createTransport}= require("nodemailer");
const {sign,verify}= require("jsonwebtoken");
const sequelize = require("../db");
// const pkey="Entertainment&SportsAPIsouvik_abhijeet";


module.exports = {
// addMovies function for movie addition to the db

    async addMovies(req, res) {
        // console.log("IN ADD MOVIES CONTROLLER");
        try{

          let uploadedId=[];
            console.log(req.body);
            const imageContent = convert(req.file.originalname, req.file.buffer)
            const {releasedate}=req.body;
            const date = new Date(releasedate);
            const image = await cloudinary.uploader.upload(imageContent)
            req.body.posterimage=image.secure_url;
            req.body.releasedate=date;
            req.body.genre = [req.body.genre];
            req.body.language = [req.body.language];
            req.body.cast = [req.body.cast];
            req.body.availableScreen = [req.body.availablescreen];
            const newUser = new movieModel(req.body);
            // console.log("new",newUser);
            const user = await userModel.findOne({where:{id: req.user.id}});
            
            

            const uploadedMovie = await newUser.save();
            // user.dataValues.movie.push(uploadedMovie.dataValues.id);
            console.log(uploadedMovie);
            user.dataValues.movie.push(uploadedMovie.dataValues.id);
            console.log(user);
            const updatedUser = await user.update({movie:user.dataValues.movie},{where:{id:req.user.id}});
            console.log("Updated User =",updatedUser);
            res.status(201).send({msg:"Sucessfully Uploaded",data:uploadedMovie});
        }
        catch( err){
            console.log(err);
            res.status(400).send({ErrorMessage:err.message});
        }
    },


    async addTheater(req,res){
        try{
            req.body.city = req.params.cityId;
            const newTheater = new theaterModel({...req.body});
            const theater = await newTheater.save();
            const user = await userModel.findOne({where:{id:req.user.id}});
            console.log(theater);
            console.log("user",user);
            user.dataValues.theatre.push(theater.dataValues.id);
            console.log(user);
            const updatedUser = await user.update({theatre:user.dataValues.theatre},{where:{id:req.user.id}});
            return res.status(201).send({msg:"Sucessfully Uploaded",theater:theater});
  
        }
        catch(err){
          return res.status(400).send({ErrorMessage:err.message});
        }
      },
  
  
    ///---------------------------------------------------------------////
  //addCity function for addition of city to the db
    async addCity(req,res){
          // console.log(req.body);
          try{
  
            const newcity = new cityModel({...req.body})
            const city = await newcity.save();
            res.status(201).send({msg:"Sucessfully Uploaded",city:city});
          }
          catch(err){
            return res.status(400).send({ErrorMessage:err.message});
          }
    },
  
    async addSports(req,res){
        try{
          console.log(req.body);
            if(req.file === undefined)
              throw new Error("Please provide the poster");
            const imageContent = convert(req.file.originalname, req.file.buffer);
            req.body.city = req.params.cityId;
            const{startingdate} = req.body;
            if(startingdate === undefined)
              throw new Error("Please Provide statting date");
            req.body.startingdate = new Date(startingdate);
            const image = await cloudinary.uploader.upload(imageContent);
            req.body.posterimage = image.secure_url;
            const newSport = new sportModel({...req.body});
           
            // newSport.startingDate = new Date(startingDate);
            const sport = await newSport.save();
            const user = await userModel.findOne({where:{id: req.user.id}});            
            // // console.log(theater._id);
            // user[0].sport.push(sport._id);
            // // console.log(user);
            // user[0].save();
            user.dataValues.sport.push(sport.dataValues.id);
            // console.log(user);
            const updatedUser = await user.update({sport:user.dataValues.sport},{where:{id:req.user.id}});
            return res.status(201).send({msg:"Sucessfully Uploaded",sport:sport});
      }
      catch(err){
        return res.status(400).send({ErrorMessage:err.message});
      }
  
    },
  /// Add event 
    async addEvent(req,res){
        try{
            console.log(req.body);
            if(req.file === undefined)
              throw new Error("Please provide the poster");
          const imageContent = convert(req.file.originalname, req.file.buffer);
          req.body.city = req.params.cityId;
          const {date} = req.body;
          if(date === undefined)
            throw new Error("Please Provide statting date");
          req.body.date = new Date(date);
          const image = await cloudinary.uploader.upload(imageContent);
          req.body.poster = image.secure_url;
          console.log(req.body);
          const newEvent = new eventModel({...req.body});
          // newSport.startingDate = new Date(startingDate);
          const event = await newEvent.save();
  
          const user = await userModel.findOne({where:{id: req.user.id}});            
          // console.log(theater._id);
          user.dataValues.event.push(event.dataValues.id);
          // console.log(user);
          const updatedUser = await user.update({event:user.dataValues.event},{where:{id:req.user.id}});          
          return res.status(201).send({msg:"Sucessfully Uploaded",event:event});
        }
        catch(err){
          return res.status(400).send({ErrorMessage:err.message});
        }
    },
  
    async addTvSeries(req,res){
  
          try{
          
              console.log(req.body);
                  if(req.file === undefined)
                    throw new Error("Please provide the poster");
                const imageContent = convert(req.file.originalname, req.file.buffer);
                const {releasedate} = req.body;
                if(releasedate === undefined)
                  throw new Error("Please Provide release date");
                req.body.releasedate = new Date(releasedate);
                const image = await cloudinary.uploader.upload(imageContent);
                req.body.posterimage = image.secure_url;
                console.log(req.body);
                const newTv = new tvModel({...req.body});
                // newSport.startingDate = new Date(startingDate);
                const tv = await newTv.save();
  

                const user = await userModel.findOne({where:{id: req.user.id}});            
                // console.log(theater._id);
                user.dataValues.tvseries.push(tv.dataValues.id);
                // console.log(user);
                const updatedUser = await user.update({tvseries:user.dataValues.tvseries},{where:{id:req.user.id}});               // console.log(theater._id);
                // user[0].tvSeries.push(tv._id);
                // // console.log(user);
                // user[0].save();
                return res.status(201).send({msg:"Sucessfully Uploaded",tv:tv});
          }
          catch(err){
            return res.status(400).send({ErrorMessage:err.message});
          }
  
    },
  
  ///----------------------------------------------------------------------////
  // addThreaterToMovie function for movie distribution to a perticular theater
    async addThreaterToMovie(req,res){
  
      try{
        // const movie = await sequelize.query(`SELECT * FORM movie WHERE id=${req.params.movieId}`);
          const movie = await movieModel.findOne({where:{id:req.params.movieId}});
          console.log(movie);
          if(movie.dataValues.threater[0]===null)
          {
            movie.dataValues.threater.splice(0,1);
          }
          movie.dataValues.threater.push(req.params.theaterId);
          const addMovie = await movie.update({threater:movie.dataValues.threater},{where:{id:req.user.id}});          
          res.status(200).send({msg:"Sucessfully Uploaded",movie:addMovie});
      }
      catch(err){
        return res.status(400).send({ErrorMessage:err.message});
      }
    },
  
    //add Seat function add seats to db
    async addSeat(req,res){
  
      try{
  
        req.body.theater = req.params.theaterId;
        const newseat = new seatModel({...req.body});
        const seat = await newseat.save();
        return res.status(201).send({msg:"Sucessfully Uploaded",seat:seat});
      }
      catch(err){
        return res.status(400).send({ErrorMessage:err.message});
      }
    },
  
      //add addShowTime function add show timings to db
  
    async addShowTime(req,res){
  
      try{
  
        req.body.theater = req.params.theaterId;
        req.body.movie = req.params.movieId;
        req.body.startingdate= new Date(req.body.startingdate);
        const newShow = new showModel({...req.body}) ;
        const show = await newShow.save();
        return res.status(201).send({msg:"Sucessfully Uploaded",show:show});
      }
      catch(err){
        return res.status(400).send({ErrorMessage:err.message});
      }
    },
//     async addSports(req,res){
//       try{
//           if(req.file === undefined)
//             throw new Error("Please provide the poster");
//           const imageContent = convert(req.file.originalname, req.file.buffer);
//           req.body.city = req.params.cityId;
//           const {startingDate} = req.body;
//           if(startingDate === undefined)
//             throw new Error("Please Provide statting date");
//           req.body.startingDate = new Date(startingDate);
//           const image = await cloudinary.uploader.upload(imageContent);
//           req.body.posterImage = image.secure_url;
//           const newSport = new sportModel({...req.body});
         
//           // newSport.startingDate = new Date(startingDate);
//           const sport = await newSport.save();
//           const user = await userModel.find(ObjectId(req.user.id));
//           // console.log(theater._id);
//           user[0].sport.push(sport._id);
//           // console.log(user);
//           user[0].save();
//           return res.status(201).send({msg:"Sucessfully Uploaded",sport:sport});
//     }
//     catch(err){
//       return res.status(400).send({ErrorMessage:err.message});
//     }

//   },
// /// Add event 
//   async addEvent(req,res){
//       try{
//           console.log(req.body);
//           if(req.file === undefined)
//             throw new Error("Please provide the poster");
//         const imageContent = convert(req.file.originalname, req.file.buffer);
//         req.body.city = req.params.cityId;
//         const {date} = req.body;
//         if(date === undefined)
//           throw new Error("Please Provide statting date");
//         req.body.date = new Date(date);
//         const image = await cloudinary.uploader.upload(imageContent);
//         req.body.poster = image.secure_url;
//         console.log(req.body);
//         const newEvent = new eventModel({...req.body});
//         // newSport.startingDate = new Date(startingDate);
//         const event = await newEvent.save();

//         const user = await userModel.find(ObjectId(req.user.id));
//       // console.log(theater._id);
//         user[0].event.push(event._id);
//         // console.log(user);
//         user[0].save();
        
//         return res.status(201).send({msg:"Sucessfully Uploaded",event:event});
//       }
//       catch(err){
//         return res.status(400).send({ErrorMessage:err.message});
//       }
//   },

//   async addTvSeries(req,res){

//         try{
        
//             console.log(req.body);
//                 if(req.file === undefined)
//                   throw new Error("Please provide the poster");
//               const imageContent = convert(req.file.originalname, req.file.buffer);
//               const {releaseDate} = req.body;
//               if(releaseDate === undefined)
//                 throw new Error("Please Provide release date");
//               req.body.releaseDate = new Date(releaseDate);
//               const image = await cloudinary.uploader.upload(imageContent);
//               req.body.posterImage = image.secure_url;
//               console.log(req.body);
//               const newTv = new tvModel({...req.body});
//               // newSport.startingDate = new Date(startingDate);
//               const tv = await newTv.save();

//               const user = await userModel.find(ObjectId(req.user.id));
//             // console.log(theater._id);
//               user[0].tvSeries.push(tv._id);
//               // console.log(user);
//               user[0].save();
//               return res.status(201).send({msg:"Sucessfully Uploaded",tv:tv});
//         }
//         catch(err){
//           return res.status(400).send({ErrorMessage:err.message});
//         }

//   },

  
    // updateMovie details by updateMovie function
  
    async updateMovie(req, res){

      // await Pug.update({ 
      //   adoptedStatus: true
      // }, {
      //   where: {age: 7},
      //   returning: true, // needed for affectedRows to be populated
      //   plain: true // makes sure that the returned instances are just plain objects
      // })
      try{
        const movieId = req.params.movieId;
        // const updateMovie = {...req.body};
        // await movieModel.updateOne({_id: movieId},{...req.body},{new: true});
        const updatedMovie = await movieModel.update({...req.body},{where:{id:movieId},returning:true,plain:true});
        console.log(updatedMovie);
        return res.status(200).send({message: "your movie hase been updated Sucessfully", data: updatedMovie});
      }
      catch(err){
        res.status(400).send({ErrorMessage:err.message});
      }
    },
  
    // updateTheater details
  
    async updateTheater(req, res){
      try{
        const theaterId = req.params.theaterId;
        // const updateTheater = {...req.body};
        // await theaterModel.updateOne({_id: theaterId},{...req.body},{new: true});
        const updatedTheater = await theaterModel.update({...req.body},{where:{id:theaterId},returning:true,plain:true});
        return res.status(200).send({message: "your movie hase been updated Sucessfully", data: updatedTheater});
      }
      catch(err){
        res.status(400).send({ErrorMessage:err.message});
      }
    },
  
    // update seat details
  
    async updateSeat(req, res){
      try{
        const seatId = req.params.seatId;
        // const updateSeat = {...req.body};
        // await seatModel.updateOne({_id: seatId},{updateSeat}, {new: true});
        const updatedSeat = await seatModel.update({...req.body},{where:{id:seatId},returning:true,plain:true});
        return res.status(200).send({message: "your movie hase been updated Sucessfully", data: updatedSeat});
      }
      catch(err){
        res.status(400).send({ErrorMessage:err.message});
      }
    },
  
    // updateShowTime details
  
    async updateShowTime(req, res){
      try{
        const showId = req.params.showId;
        // const updateShowTime = {...req.body};
        // await showModel.updateOne({_id: showId},{updateShowTime}, {new: true});
        const updateShowTime = await showModel.update({...req.body},{where:{id:showId},returning:true,plain:true});
        return res.status(200).send({message: "your movie hase been updated Sucessfully", data: updateShowTime});
      }
      catch(err){
        res.status(400).send({ErrorMessage:err.message});
      }
    },
  
    // updateSports details
  
    async updateSport(req, res){
      try{
        const sportId = req.params.sportId;
        // const updateSport = {...req.body};
        // await sportModel.updateOne({_id: sportId}, {updateSport}, {new: true});
        const updateSport = await sportModel.update({...req.body},{where:{id:sportId},returning:true,plain:true});
        return res.status(200).send({message: "your sport hase been updated Sucessfully", data: updateSport});
      }
      catch(err){
        res.status(400).send({ErrorMessage:err.message});
      }
    },
  
    // updateEvent detail
  
    async updateEvent(req, res){
      try{
        const eventId = req.params.eventId;
        // const updateEvent = {...req.body};
        // await eventModel.updateOne({_id: eventId}, {updateEvent}, {new: true});
        const updateEvent = await eventModel.update({...req.body},{where:{id:eventId},returning:true,plain:true});
        return res.status(200).send({message: "your event hase been updated Sucessfully", data: updateEvent});
      }
      catch(err){
        res.status(400).send({ErrorMessage:err.message});
      }
    },
  
    // updateTvSeries details
  
    async updateTvSeries(req, res){
      try{
        const tvSeriesId = req.params.tvSeriesId;
        // const updateTvSeries = {...req.body};
        // await tvModel.updateOne({_id: tvSeriesId}, {updateTvSeries}, {new: true});
        const updateTvSeries = await tvModel.update({...req.body},{where:{id:tvSeriesId},returning:true,plain:true});
        return res.status(200).send({message: "your tvSeries hase been updated Sucessfully", data: updateTvSeries});
      }
      catch(err){
        res.status(400).send({ErrorMessage:err.message});
      }
    },
  
    // deleteTheater details
  
    async deleteTheater(req, res){


      // Pug.destroy({
      //   where: {
      //     age: 7 // deletes all pugs whose age is 7
      //   }
      // })
      try{
        const theaterId = req.params.theaterId;
        const theater = await theaterModel.destroy({where:{id: theaterId}});
        const movie = await movieModel.findAll();
        console.log(movie.length);
        for (let i =0; i< movie.length; i++)
        {
              // console.log(movie[i].dataValues.threater);
              let index = movie[i].dataValues.threater.findIndex(element=>{
                console.log(element,theaterId);
                    return String(element) === theaterId  
              })
              // console.log(index);
              if(index!==-1)
              {
                  movie[i].dataValues.threater.splice(index,1);
                  await movieModel.update({...movie[i].dataValues},{where:{id:movie[i].dataValues.id},returning:true,plain:true})
              }
        }
        // await movieModel.update({movie});
        await seatModel.destroy({where:{theater: theaterId}});
        await showModel.destroy({where:{theater: theaterId}});
        return res.status(200).send({message: "Your theater has been permanently deleted",data:movie});
      }
      catch(err){
        res.status(400).send({ErrorMessage:err.message});
      }
    },
  
    // deleteSeat detatils
  //---------------------------------------
    async deleteSeat(req, res){
      try{
        const seatId = req.params.seatId;
        await seatModel.destroy({where:{id:seatId}});
        return res.status(200).send({message: "Your seat has been permanently deleted"});
      }
      catch(err){
        res.status(400).send({ErrorMessage:err.message});
      }
    },
  
    // deleteShow details
  
    async deleteShow(req, res){
      try{
        const showId = req.params.showId;
        await showModel.destroy({where:{id:showId}});
        return res.status(200).send({message: "Your show has been permanently deleted"});
      }
      catch(err){
        res.status(400).send({ErrorMessage:err.message});
      }
    },
  
    // removeTheaterFromMovie
  
    // async removeTheaterFromMovie(req, res){
    //   try{
    //     const movieId = req.params.movieId;
    //     const theaterId = req.params.theaterId;
    //     const movie = movieModel.findOne({where:{id:movieId}});
    //     const index = movie.dataValues.threater.findIndex(element=>{
    //       return String(element) === theaterId; 
    //     })
    //     if(index!==-1)
    //     {
    //         movie.dataValues.threater.splice(index,1);
    //         await movieModel.update({...movie.dataValues},{where:{id:movie.dataValues.id},returning:true,plain:true})
    //     }
    //     return res.status(200).send({message: "Your theater has been permanently removed from movie"});
    //   }
    //   catch(err){
    //     res.status(400).send({ErrorMessage:err.message});
    //   }
    // },
  
    // deleteSport details
  
    async deleteSport(req, res){
      try{
        const sportId = req.params.sportId;
        console.log(sportId);
        const sp = await sportModel.destroy({where:{id:sportId}});
        if(sp===0) throw new Error("There no such Sport");
        const user = await userModel.findAll();
        for ( let i =0; i< user.length; i++)
        {
              const index = user[i].dataValues.sport.findIndex(element=>{
                return String(element) === sportId
              })
              console.log(index);
              if(index!==-1)
              {
                  user[i].dataValues.sport.splice(index,1);
                  console.log(user[i].dataValues)
                 await userModel.update({...user[i].dataValues},{where:{id:user[i].dataValues.id},returning:true,plain:true})
              }
        }
        return res.status(200).send({message: "Your sport has been permanently deleted"});
      }
      catch(err){
        res.status(400).send({ErrorMessage:err.message});
      }
    },
  
    // deleteEvent details
  
    async deleteEvent(req, res){
      try{
        const eventId = req.params.eventId;
         await eventModel.destroy({where:{id:eventId}});
        const user = await userModel.findAll();
        for ( let i =0; i< user.length; i++)
        {
              const index = user[i].dataValues.event.findIndex(element=>{
                return String(element) === eventId
              })
              console.log(index);
              if(index!==-1)
              {
                  user[i].dataValues.event.splice(index,1);
                  console.log(user[i].dataValues)
                 await userModel.update({...user[i].dataValues},{where:{id:user[i].dataValues.id},returning:true,plain:true})
              }
        }
        return res.status(200).send({message: "Your event has been permanently deleted"});
      }
      catch(err){
        res.status(400).send({ErrorMessage:err.message});
      }
    },
  
    // deleteTvSeries details
  
    async deleteTvSeries(req, res){
      try{
        const tvSeriesId = req.params.tvSeriesId;
        const tv =await tvModel.destroy({where:{id:tvSeriesId}});
        console.log(tv);
        if(tv===0) throw new Error("There is no such tv seires");

        const user = await userModel.findAll();
        for ( let i =0; i< user.length; i++)
        {
              const index = user[i].dataValues.tvseries.findIndex(element=>{
                return String(element) === tvSeriesId
              })
              console.log(index);
              if(index!==-1)
              {
                  user[i].dataValues.tvseries.splice(index,1);
                  console.log(user[i].dataValues)
                 await userModel.update({...user[i].dataValues},{where:{id:user[i].dataValues.id},returning:true,plain:true})
              }
        }
        return res.status(200).send({message: "Your Tv-Series has been permanently deleted"});
      }
      catch(err){
        res.status(400).send({ErrorMessage:err.message});
      }
    }  

}