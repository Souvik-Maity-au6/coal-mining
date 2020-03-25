
const cloudinary = require("../cloudinary");
const movieModel = require("../models/movie");
const cityModel = require("../models/City");
const threaterModel = require("../models/Theater");
const seatModel = require("../models/Seat");
const convert = require("../converter");


module.exports = {
// addMovies function for movie addition to the db

    async addMovies(req, res) {
        // console.log("IN ADD MOVIES CONTROLLER");
        try{

            const imageContent = convert(req.file.originalname, req.file.buffer)
            const {releaseDate}=req.body;
            const date = new Date(releaseDate);
            const image = await cloudinary.uploader.upload(imageContent)
            req.body.posterImage=image.secure_url;
            req.body.releaseDate=date;
            req.body.threatre=req.params.theatreId;
            let newMovie = new movieModel(req.body);
            const uploadedMovie = await newMovie.save();
            // console.log(uploadedMovie);
             res.status(201).send({msg:"Sucessfully Uploaded",data:uploadedMovie});
        }
        catch( err){
            res.status(400).send({msg:err.message});
        }
    },


///--------------------------------------------------------------////
// addTheater function for addition of theater to the db
    async addTheater(req,res){
        req.body.city = req.params.cityId;
        const newTheater = new threaterModel({...req.body});
        await newTheater.save();
        return res.send("DOne");
    },


  ///---------------------------------------------------------------////
//addCity function for addition of city to the db
  async addCity(req,res){
        // console.log(req.body);
        const newcity = new cityModel({...req.body})
        newcity.save();
        res.send("DONE");
  },



///----------------------------------------------------------------------////
// addThreaterToMovie function for movie distribution to a perticular theater
  async addThreaterToMovie(req,res){
      const movie = await movieModel.findById({_id:req.params.movieId});
      movie.threater.push(req.params.theatreId);
      const addMovie = await movie.save();
      res.status(200).send({msg:"Sucessfully Uploaded",movie:addMovie});
  },
  async addSeat(req,res){

      req.body.theater=req.params.theatreId;
      const newseat= new seatModel({...req.body});
      const seat = await newseat.save();
      return res.status(201).send({msg:"Sucessfully Uploaded",seat:seat});
  }

}