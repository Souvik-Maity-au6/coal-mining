
const movieModel = require("../models/movie");
const cityModel = require("../models/City");
const userModel =require("../models/User");
const threaterModel = require("../models/Theater");
const {mailConfig} = require("../sendMail");
const {verify,sign}= require("jsonwebtoken");



module.exports = {
     ///-----------------------------------------------------------------------////
    //  serchTheater function for searching all details of that theater
  async searchTheater(req,res){
    // console.log(req.query);
    try{

        const movie = await movieModel.find({mname:req.query.mname}).populate("threater");
        const city = await cityModel.find({name:req.query.city});
        const allTheater= movie[0].threater;
        const chosenCity = allTheater.filter((theater)=>{
            return String(theater.city) === String(city[0]._id); 
        })
        res.status(200).send({chosenCityTheater:chosenCity});
    }
    catch(err){
      res.status(404).send({Message:"Data not Found"});
    }
  },

  ///---------------------------------------------------------------------------------////
//   getALLMovies function for getting all the details of all movie avilable
  async getAllMovies(_,res){
      const allMovie = await movieModel.find({});
        return res.status(200).send({allMovie:allMovie});
  },

//   getALLMovies function for getting all the details of particular movie avilable
  async getSingleMovie(req, res){
    try{
        
        const movie = await movieModel.find({mname: req.query.movieName})
        return res.status(200).send({movie: movie}); 
    }
    catch(err){
      return res.status(404).send({Message:"Data not found"})
    }
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
  }
}