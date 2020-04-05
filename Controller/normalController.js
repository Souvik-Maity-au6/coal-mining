
const movieModel = require("../models/movie");
const cityModel = require("../models/City");
const seatModel = require("../models/Seat");
const userModel =require("../models/User");
const theaterModel = require("../models/Theater");
const {mailConfig} = require("../sendMail");
const {verify,sign}= require("jsonwebtoken");
const showModel = require("../models/showTime");
const tvModel = require("../models/TvSeries");
const eventModel = require("../models/Event");



module.exports = {
     ///-----------------------------------------------------------------------////
    //  serchTheater function for searching all details of that theater in a particular city
  async searchTheater(req,res){
    // console.log(req.query);
    try{

      if(req.query.mname!==undefined && req.query.city!==undefined)
      {

          const movie = await movieModel.find({mname:req.query.mname}).populate("theater");
          // console.log(movie);
          const city = await cityModel.find({name:req.query.city});
          console.log(city);
          const allTheater= movie[0].theater;
          console.log(allTheater);
          const chosenCity = allTheater.filter((theater)=>{
            console.log(theater.city);
            console.log(city[0]._id);
              return String(theater.city) === String(city[0]._id); 
          })
          return res.status(200).send({chosenCityTheater:chosenCity});
      }
      else if(req.query.mname!=undefined)
      {
        const movie = await movieModel.find({mname:req.query.mname}).populate("theater");
        // console.log(movie);
        const allTheater= movie[0].theater;
        return res.status(200).send({allTheater:allTheater});
      }
      return res.status(200).send({msg:"You havenot provided cityName || Movie name "});
    }
    catch(err){
      return res.status(404).send({Message:"Data not Found"});
    }
  },

  // get seat details of a particular theater and sorting them by price
  async getSeatDetails(req,res){


    try{
        console.log("I am in seat deatails");
        const {theaterName} = req.query;
      // console.log(cityName);
      // console.log(movieModel.find({}))
        const theaters = await theaterModel.find({name:theaterName});
        // console.log(theaters._id);
        const seatDetails = await seatModel.find({theater:theaters[0]._id}).sort({price:1});
        console.log(seatDetails);
        return res.send({allTheaterSeatDetails:seatDetails});
    }
    catch(err){
      return res.send({msg:err.message});
    }
  },

  /// search theater by city
  async searchTheaterByCity(req,res){
      try{
          console.log("Hello");
          const {cityName}=req.query;
          const city = await cityModel.find({name:cityName});
          const theater = await theaterModel.find({city:city[0]._id});
          return res.send({msg:"All cities",theater:theater});
      }
      catch(err){
        return res.send({msg:err.message});
      }
  },
  // search theater by available screen for a particular city
  async searchTheaterByAvailableScreen(req,res){

          
          try{

              const {screen,cityName}=req.query;
              // console.log(cityName);
              if(screen !== undefined && cityName!==undefined)
              {
                const city = await cityModel.find({name:cityName});
                console.log(city);
                const theater = await theaterModel.find({avilable_screen:{$in:[screen]},city:city[0]._id});
                return res.send({theater:theater});
              }
              // This gives all the theater of that specific screen type
              else if(screen!==undefined)
              {
                const theater = await theaterModel.find({avilable_screen:{$in:[screen]}});
                return res.send({theater:theater});
              }
              return res.send({msg:"Either you havent provided screen type"});
          }
          catch(err){
            return res.send({msg:err.message});
          }
  },
  ///---------------------------------------------------------------------------------////
//   getALLMovies function for getting all the details of all movie avilable
  async getAllMovies(req,res){

      try{
          const pageNo = req.query.page * 1;
          const limit = req.query.limit * 1 ;
          const skip = (pageNo-1)*limit;    
          const allMovie = await movieModel.find({}).skip(skip).limit(limit);
          if(allMovie.length!==0)
            return res.status(200).send({allMovie:allMovie});
          return res.status(200).send({msg:`There is no movies in page ${pageNo}`});
    }
    catch(err){

      return res.status(200).send({msg:err.message});
    }
     
  },
  // get show timing of a flim in a particular Theater

  async getShowTiming(req,res){

        const {theaterName,movieName}= req.query;
        const movie = await movieModel.find({mname:movieName});
        const theater = await theaterModel.find({name:theaterName});
        const showTimings = await showModel.find({movie:movie[0]._id,theater:theater[0]._id});
        return res.send({showTimings:showTimings});   
  },

  /// needed to be discussed
  async getTopRatedMovies(req,res){
        const top = req.query.top * 1;
        const Topmovie = await movieModel.find({}).sort({imdRating:-1}).limit(top);
      
        res.status(200).send(Topmovie);

  },

//   getALLMovies function for getting all the details of particular movie avilable
  async getSingleMovie(req, res){
    try{
        
        const movie = await movieModel.find({mname: req.query.movieName})
        if(movie.length===0)
          return res.status(200).send({msg:"Soory Data not found"});  
        return res.status(200).send({movie: movie}); 
    }
    catch(err){
      return res.status(404).send({Message:"Data not found"})
    }
  },

  async getAllCurrentMovies(req,res){
        let currentMovies;
        if(req.query.language!==undefined)
        {
          currentMovies = await movieModel.find({currentlyRunning:true,language:{$in:[req.query.language]}});
        }
        else{
          currentMovies = await movieModel.find({currentlyRunning:true});
        }
        if(currentMovies.length!==0)
          return res.send({msg:"All Currently Running Movies",currentlyRunningMovies:currentMovies})
        return res.send({msg:"Soory No movies are avaiable"});
  },


  async verify(req,res){

    // console.log(req.query);
    const {token} =req.query
    try{
        
        verify(token,process.env.PRIVATE_KEY);
        const user = await userModel.find({token:req.query.token});
        // console.log(user[0]);
        if(user[0] !== undefined){

          user[0].isAuthorized = true
          
          
          
          // console.log(user); 
          await user[0].save();

          return res.send({msg:"You have been Suceesfully Verified you can login now "});
        } 
    }
    catch(err){
      return res.redirect(`/resendEmail?token=${token}`);
      // return res.send({msg:"Your token email token is expired please login to generate new token"});
    }
    
  },

  async resendEmail(req,res){

        const user = await userModel.find({token:req.query.token});
        // console.log(user);
        // console.log("Hello Iam going to resend Email");
        user[0].generateToken();
        const updatedUser = await user[0].save();
        let html= `<a href="http://localhost:1234/verify?token=${updatedUser.token}">Verify</a>`;
        await mailConfig(html,user[0]);
        return  res.send("Your token was expired so we send another conformation email so please check your inbox");
  },

  async resetPassword(req,res){


    try{
        const{token}=req.query;
        const {newPassword}= req.params;
        verify(token,process.env.PRIVATE_KEY);
        const user = await userModel.find({token:token});
        
        // console.log(user);
        user[0].password = newPassword;
        user[0].save();
        return res.send({msg:"Your Password has been sucessfully chnaged."});
    }
    catch(err){
        return res.send({msg:"Reset Password request is expired. Please try to forgot password again"});
    }
  },
  async searchUpcomingMovie(req, res){
    try{
       const month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
      const upcomingMonth = req.query.month;
      const upcomingYear = Number(req.query.year);
      const upcomingMovies = await movieModel.find({upcoming: true})
      const index = month.findIndex(mo =>{
        return mo === upcomingMonth;
      }) 
        const movieOfThatMonth = upcomingMovies.filter(movies =>{
          // console.log(movies.releaseDate.getMonth());
          // console.log(index);
          if(upcomingMonth && upcomingYear) {
            return movies.releaseDate.getMonth() === index && movies.releaseDate.getFullYear() === upcomingYear;
            
          }
          else if(upcomingYear) {
            return movies.releaseDate.getFullYear() === upcomingYear;
          }
          else if(upcomingMonth) return movies.releaseDate.getMonth() === index; 
      })
      // console.log(movieOfThatMonth);
            return res.send({movies: movieOfThatMonth})
    }
    catch(err){
      res.status(400).send({ErrorMessage:err.message});
    }
  },
  
  // Tv-Series related Search operation
  async searchSingleTvSeries(req, res){
    try{
      const tvSeriesName = req.query.name;
     const tvSeries =  await tvModel.find({seriesName: tvSeriesName});
     if(tvSeries.length === 0 ){
       return res.status(404).send("Tv-Series not found search another")
     }else{
       return res.send(tvSeries);
     }
    }
    catch(err){
      res.status(400).send({ErrorMessage:err.message});
    }
  },
 
  async searchUpcomingTvSeries(req, res){
    try{
      const upcomingTvSeries = tvModel.find({upcoming: true});
      if(upcomingTvSeries.length === 0){
        return res.status(404).send("No Upcoming Tv-Series avilable right now search latter");
      }else{
        return res.send(upcomingTvSeries);
      }
    }
    catch(err){
      res.status(400).send({ErrorMessage:err.message});
    }
  },

  async searchCurrentTvSeries(req, res){
    try{
      const currentTvSeries = tvModel.find({currentlyRunning: true});
      if(currentTvSeries.length === 0){
        return res.status(404).send("No Current Tv-Series avilable right now search latter");
      }else{
        return res.send(currentTvSeries);
      }
    }
    catch(err){
      res.status(400).send({ErrorMessage:err.message});
    }
  },

  async searchEvent(req, res){
    try{
      const eventType = req.quary.event;
      const event = await eventModel.find({type: eventType});
      if(event.length === 0 ){
        return res.staus(404).send("No such event currently running search latter");
      }else{
        return res. send(event);
      }

    }
    catch(err){
      res.status(400).send({ErrorMessage:err.message});
    }
  }
}