
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
        console.log(user[0]);
        if(user[0]!==undefined){

          user[0].isAuthorized=true
          
          
          
          // console.log(user); 
          await user[0].save();

          return res.send({msg:"You have been Suceesfully Verified ",user:user});
        } 
    }
    catch(err){
      return res.redirect(`/resendEmail?token=${token}`);
      return res.send({msg:"Your token email token is expired please login to generate new token"});
    }
    
  },

  async resendEmail(req,res){

        const user = await userModel.find({token:req.query.token});
        console.log(user);
        console.log("Hello Iam going to resend Email");
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
        user[0].password=newPassword;
        user[0].save();
        return res.send({msg:"Your Password has been sucessfully chnaged."});
    }
    catch(err){
        return res.send({msg:"Reset Password request is expired. Please try to forgot password again"});
    }
  }
}