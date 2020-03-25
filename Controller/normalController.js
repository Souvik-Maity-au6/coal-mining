
const movieModel = require("../models/movie");
const cityModel = require("../models/City");
const threaterModel = require("../models/Theater");



module.exports = {
     ///-----------------------------------------------------------------------////
    //  serchTheater function for searching all details of that theater
  async searchTheater(req,res){
      const movie = await movieModel.find({mname:req.query.mname}).populate("threatre");
      const city = await cityModel.find({name:req.query.city});
      const allTheater= movie[0].threater;
      const chosenCity = allTheater.filter((theater)=>{
          return String(theater.city[0]) === String(city[0]._id); 
      })
      res.status(200).send({chosenCity:chosenCity});
  },

  ///---------------------------------------------------------------------------------////
//   getALLMovies function for getting all the details of all movie avilable
  async getAllMovies(_,res){
      const allMovie = await movieModel.find({});
        return res.status(200).send({allMovie:allMovie});
  },

//   getALLMovies function for getting all the details of particular movie avilable
  async getSingleMovie(req, res){
      const movie = await movieModel.find({mname: req.query.movieName})
      return res.status(200).send({movie: movie});
  }
}