const upload = require("../multer1");
const cloudinary = require("../cloudinary");
const movieModel = require("../models/movie");
const cityModel = require("../models/City");
const threatreModel = require("../models/Theatre");
const convert = require("../conver");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

module.exports = {

    async addMovies(req, res) {
        console.log("IN ADD MOVIES CONTROLLER");
        try{

            const imageContent = convert(req.file.originalname, req.file.buffer)
            const {releaseDate}=req.body;
            const date = new Date(releaseDate);
            // console.log(date.toUTCString());
            const image = await cloudinary.uploader.upload(imageContent)
            req.body.posterImage=image.secure_url;
            req.body.releaseDate=date;
            req.body.threatre=req.params.theatreId;
            let newMovie = new movieModel(req.body);
            const uploadedMovie = await newMovie.save();
            console.log(uploadedMovie);
             res.status(201).send({msg:"Sucessfully Uploaded",data:uploadedMovie});
        }
        catch( err){
            res.status(400).send({msg:err.message});
        }
    },
///--------------------------------------------------------------////
    async addTheatre(req,res){
        // console.log(req.params);
        console.log("IN ADD THEATRE CONTROLLER");
        req.body.city = req.params.cityId;
        const newTheater = new threatreModel({...req.body});
           
        newTheater.save();
        return res.send("DOne");
    },
  ///---------------------------------------------------------------////
  
  async addCity(req,res){
        console.log(req.body);
        const newcity = new cityModel({...req.body})
        newcity.save();
        res.send("DONE");
  },
///----------------------------------------------------------------------////
  async addThreaterToMovie(req,res){
      console.log(req.params);
      const movie = await movieModel.findById({_id:req.params.movieId});
      console.log(movie);
      movie.threatre.push(req.params.theatreId);
      console.log(movie);
      const addMovie = await movie.save();
      res.status(200).send({msg:"Sucessfully Uploaded",movie:addMovie});
  },
  ///-----------------------------------------------------------------------////
  async searchTheatre(req,res){
      console.log(req.query);
      const movie = await movieModel.find({mname:req.query.mname}).populate("threatre");
      const city = await cityModel.find({name:req.query.city});
      const allTheatre= movie[0].threatre;
      const chosenCity = allTheatre.filter((theatre)=>{
          console.log(theatre.city[0]);
          console.log(city[0]._id);
          return String(theatre.city[0]) === String(city[0]._id); 
      })
      console.log(chosenCity);
      res.send({chosenCity:chosenCity});
  },

  ///---------------------------------------------------------------------------------////
  async getAllMovies(req,res){
      const allMovie = await movieModel.find({});
        return res.send({allMovie:allMovie});
  }
}