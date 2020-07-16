
const movieModel = require("../models/Movie");
const cityModel = require("../models/City");
const userModel =require("../models/User");
const theaterModel = require("../models/Theater");
const seatModel = require("../models/Seat");
const tvModel = require("../models/TvSeries");
const sequelize = require("../db");
const {verify}=require("jsonwebtoken");
const {mailConfig} = require("../sendMail");
const showModel = require("../models/showTime");
const eventModel = require("../models/Event");
const sportModel = require("../models/Sports");
const {hash} = require("bcryptjs");
// const sequelize = require("../db");



module.exports = {
     ///-----------------------------------------------------------------------////
  //   //  serchTheater function for searching all details of that theater
  // async searchTheater(req,res){
  //   // console.log(req.query);
  //   try{

  //     if(req.query.mname!==undefined && req.query.city!==undefined)
  //     {

  //         const movie = await movieModel.find({mname:req.query.mname}).populate("theater");
  //         // console.log(movie);
  //         const city = await cityModel.find({name:req.query.city});
  //         const allTheater= movie[0].theater;
  //         const chosenCity = allTheater.filter((theater)=>{
  //             return String(theater.city) === String(city[0]._id); 
  //         })
  //         return res.status(200).send({chosenCityTheater:chosenCity});
  //     }
  //     else if(req.query.mname!=undefined)
  //     {
  //       const movie = await movieModel.find({mname:req.query.mname}).populate("theater");
  //       // console.log(movie);
  //       const allTheater= movie[0].theater;
  //       return res.status(200).send({allTheater:allTheater});
  //     }
  //     return res.status(200).send({msg:"You havenot provided cityName || Movie name "});
  //   }
  //   catch(err){
  //     return res.status(404).send({Message:"Data not Found"});
  //   }
  // },

//   ///---------------------------------------------------------------------------------////
// //   getALLMovies function for getting all the details of all movie avilable
//   async getAllMovies(_,res){
//       const allMovie = await movieModel.find({});
//         return res.status(200).send({allMovie:allMovie});
//   },

// //   getALLMovies function for getting all the details of particular movie avilable
//   async getSingleMovie(req, res){
//     try{
        
//         const movie = await movieModel.find({mname: req.query.movieName})
//         return res.status(200).send({movie: movie}); 
//     }
//     catch(err){
//       return res.status(404).send({Message:"Data not found"})
//     }
//   },


        async verify(req,res){


            const {token} =req.query
            try{
                
                verify(token,process.env.PRIVATE_KEY);
                // const user = await userModel.find({token:req.query.token});
                const user = await sequelize.query(`SELECT * FROM "user" WHERE token='${token}'`,{ type: sequelize.QueryTypes.SELECT});
                // console.log(user[0].dataValue);
                // console.log(user);
                if(user[0] !== undefined){
        
                //   user[0].isauthorized = true
                  
                  
                  
                  
                  const updatedUser =await sequelize.query(`UPDATE "user" SET isauthorized=${true}`);
                    // console.log(updatedUser);
                  return res.send({msg:"You have been Suceesfully Verified you can login now "});
                } 
            }
            catch(err){
                console.log(err);
              return res.redirect(`/resendEmail?token=${token}`);
              // return res.send({msg:"Your token email token is expired please login to generate new token"});
            }
        },

        async resendEmail(req,res){


            const {token}= req.query;
            console.log("Token=",token);
            // const user = await userModel.find({token:req.query.token});
            const user = await sequelize.query(`SELECT * FROM "user" WHERE token='${token}'`,{ type: sequelize.QueryTypes.SELECT});
            console.log(user);
            // console.log("Hello Iam going to resend Email");
            // console.log(user);
            await userModel.generateToken(user[0]);
            // // console.log(user[0][0]);
            //  const updatedUser =  new userModel(user[0]);
            //  console.log("updated user = ",updatedUser.dataValues);
            await sequelize.query(`UPDATE "user" SET token='${user[0].token}'`);
            let html= `<a href="http://localhost:1234/verify?token=${user[0].token}">Verify</a>`;
            await mailConfig(html,user[0]);
            return  res.send("Your token was expired so we send another conformation email so please check your inbox");
      },


  async resetPassword(req,res){
    try{
        console.log("Hello World");
          const{token}=req.query;
        const {newPassword}= req.params;
        console.log(newPassword)
          verify(token,process.env.PRIVATE_KEY);
        // const user = await userModel.find({token:token});
        const user = await sequelize.query( `SELECT * FROM "user" WHERE token='${token}'`,{ type: sequelize.QueryTypes.SELECT})
        console.log("reset password =",user);
        user[0].password = await hash(newPassword,10);
        await sequelize.query(`UPDATE "user"  SET token='${user[0].token}',password='${user[0].password}',isloggedin=${false}`);         
        return res.send({msg:"Your Password has been sucessfully changed."});
    }
    catch(err){
        return res.send({msg:"Reset Password request is expired. Please try to forgot password again"});
    }
  },



  async searchTheater(req,res){
    try{
      // console.log(req.query.city!==undefined);
      if(req.query.mname!==undefined && req.query.city!==undefined)
      {
          // console.log(req.query);

          // console.log(movie);
          const movie = await movieModel.findOne({where:{mname:req.query.mname}})
          if(movie === null) throw new Error("No such Data is found");
          console.log(movie.dataValues.threater.length);
          let theater=[];
         

          for ( let i =0; i< movie.dataValues.threater.length; i++)
          {
              theater.push(await theaterModel.findOne({where:{id:movie.dataValues.threater[i]}}));
          }
          console.log(theater);
          const city = await cityModel.findOne({where:{name:req.query.city}});
          if(city === null) throw new Error("No such Data");
          const chosenCity = theater.filter((th)=>{
              console.log(th);
              if(th !==null)
                return th.dataValues.city === city.dataValues.id; 
          })
          console.log(chosenCity);
          return res.status(200).send({chosenCityTheater:chosenCity});
      }
      else if(req.query.mname!=undefined)
      {
        const movie = await movieModel.findOne({where:{mname:req.query.mname}})
          console.log(movie.dataValues.threater.length);
          let theater=[];
         

          for ( let i =0; i< movie.dataValues.threater.length; i++)
          {
              theater.push(await theaterModel.findOne({where:{id:movie.dataValues.threater[i]}}));
          }
          return res.status(200).send({allTheater:theater});
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
        //console.log("I am in seat deatails");
        const {theaterName} = req.query;
      // console.log(cityName);
      // console.log(movieModel.find({}))
        const theaters = await theaterModel.findOne({where:{name:theaterName}});
        if(theaters===null) throw new Error("No data found");
         console.log(theaters);
        const seatDetails = await seatModel.findAll({where:{theater:theaters.dataValues.id},order: [
          ['price', 'ASC']
      ]})
      if(seatDetails.length === 0)
        return res.send({msg:"No Seat Deatils Found"});//
        // console.log(seatDetails);
      return res.send({allTheaterSeatDetails:seatDetails});
    }
    catch(err){
      return res.send({msg:err.message});
    }
  },

  /// search theater by city
  async searchTheaterByCity(req,res){
      try{
          //console.log("Hello");
          const {cityName}=req.query;
          const city = await cityModel.findOne({where:{name:cityName}});
          if(city===null) throw new Error("No city Found");
          const theater = await theaterModel.findAll({where:{city:city.dataValues.id}});
          if(theater.length ===0) throw new Error("No Theater found");
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
                const city = await cityModel.findOne({where:{name:cityName}});
                //console.log(city);
                if(city === null) throw new Error("City not found");
                const theater = await theaterModel.findAll({city:city.dataValues.id});
                console.log(theater);
                if(theater.length ===0) throw new Error("There exist no such theater");
                const th = theater.filter(element => {
                    if(element.dataValues.avilablescreen.includes(screen))
                    {
                      return element;
                    }
                });
                if(th.length===0)
                  return res.send("No Data is Found");
                return res.send({theater:th});
              }
              // This gives all the theater of that specific screen type
              else if(screen!==undefined)
              {
                const theater = await theaterModel.findAll({});
                const th = theater.filter(element => {
                  if(element.dataValues.avilablescreen.includes(screen))
                  {
                    return element;
                  }
              });
              return res.send({theater:th});
                
              }
              return res.send({msg:"Either you havent provided screen type or city Name"});
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
          const allMovie = await movieModel.findAll({offset:skip,limit:limit});
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
// here
        const {theaterName,movieName}= req.query;
        const movie = await movieModel.findOne({where:{mname:movieName}});
        const theater = await theaterModel.findOne({where:{name:theaterName}});
        const showTimings = await showModel.findAll({where:{movie:movie.dataValues.id,theater:theater.dataValues.id}});
        if(showTimings.length===0) return res.send("No Show timing Available");
        return res.send({showTimings:showTimings});   
  },

  /// needed to be discussed
  async getTopRatedMovies(req,res){
        const top = req.query.top * 1;
        const Topmovie = await movieModel.findAll({order: [
          ['imdrating', 'DESC']
      ],limit:top})
      
        res.status(200).send(Topmovie);

  },

//   getALLMovies function for getting all the details of particular movie avilable
  async getSingleMovie(req, res){
    try{
        
        const movie = await movieModel.findOne({where:{mname: req.query.movieName}})
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
          const curMovies = await movieModel.findAll({where:{currentlyrunning:true}});
          console.log(currentMovies);
          currentMovies = curMovies.filter(element=>{
            console.log(element.dataValues.language[0]);
            if(element.dataValues.language[0].includes(req.query.language) )
            {
              return element;
            }
          })
          console.log(currentMovies);
        }
        else{
          currentMovies = await movieModel.findAll({where:{currentlyrunning:true}});
        }
        if(currentMovies.length!==0)
          return res.send({msg:"All Currently Running Movies",currentlyRunningMovies:currentMovies})
        return res.send({msg:"Soory No movies are avaiable"});
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
      const upcomingMovies = await movieModel.findAll({where:{upcoming: true}})
      console.log(upcomingMovies);
      const index = month.findIndex(mo =>{
        return mo === upcomingMonth;
      }) 
        const movieOfThatMonth = upcomingMovies.filter(movies =>{
          // console.log(movies.releaseDate.getMonth());
          console.log(index);
          console.log(movies);
          if(upcomingMonth && upcomingYear) {
            return movies.dataValues.releasedate.getMonth() === index && movies.dataValues.releasedate.getFullYear() === upcomingYear;
            
          }
          else if(upcomingYear) {
            return movies.releasedate.getFullYear() === upcomingYear;
          }
          else if(upcomingMonth) return movies.dataValues.releasedate.getMonth() === index; 
      })
      // console.log(movieOfThatMonth);
      if(movieOfThatMonth.length===0)
        return res.send({msg: "No data found !!!"})
      return res.send({movies: movieOfThatMonth})
    }
    catch(err){
      res.status(400).send({ErrorMessage:err.message});
    }
  },


  async searchSingleTvSeries(req, res){
    try{
      const tvSeriesName = req.query.name;
     const tvSeries =  await tvModel.findOne({where:{seriesname: tvSeriesName}});
     console.log(tvSeries); 
     if(tvSeries === null){
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
      const upcomingTvSeries = await tvModel.findAll({where:{upcomming: true}});
      console.log(upcomingTvSeries);
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
      const currentTvSeries = await tvModel.findAll({where:{currentlyrunning: true}});
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
      const eventType = req.query.type;
      const event = await eventModel.findAll({where:{ename: eventType}});
      // console.log(event);
      if(event.length === 0 ){
        return res.status(404).send("No such event currently running search latter");
      }else{
        return res. send(event);
      }

    }
    catch(err){
      res.status(400).send({ErrorMessage:err.message});
    }
  },

  async searchCityEvents(req, res){
    try{
      const city = req.query.city;
      const state = req.query.state;
      const cityId = await cityModel.findOne({where:{name: city, state: state}});
      if(cityId ===null) throw new Error("Provide correct city");
      const events = await eventModel.findAll({where:{city: cityId.dataValues.id}});
      if(events.length === 0){
        return res.status(404).send("NO events is available in the city")
      }else{
        return res.send(events)
      }
    }
    catch(err){
      res.status(400).send({ErrorMessage:err.message});
    }
  },

  async searchSports(req, res){
    try{
      const sport = req.query.sport;
      const avilableSport = await sportModel.findOne({where:{sportname: sport}});
      if(avilableSport===null) return res.send("No Such Sport")
      return res.send(avilableSport);
    }
    catch(err){
       res.status(400).send({ErrorMessage:err.message});
    }
  },

  async searchCitySports(req, res){
    try{
      const city = req.query.city;
      const state = req.query.state;
      const cityId = await cityModel.findOne({where:{name: city, state: state}});
      if(cityId === null ) throw new Error("No Such City");
      const sports = await sportModel.findAll({where:{city: cityId.dataValues.id}});
      if(sports.length === 0){
        return res.status(404).send("No sports avilable in the city")
      }else{
        return res.send(sports)
      }
    }
    catch(err){
       res.status(400).send({ErrorMessage:err.message});
    }
  }

}