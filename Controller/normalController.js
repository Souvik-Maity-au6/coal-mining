
const movieModel = require("../models/movie");
const cityModel = require("../models/City");
const userModel =require("../models/User");
const threaterModel = require("../models/Theater");



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

    console.log(req.query);
    
    const user = await userModel.find({token:req.query.token});
    user[0].isAuthorized=true
    console.log(user); 
    await user[0].save();

    return res.send({user:user});
  }
}