
const cloudinary = require("../cloudinary");
const movieModel = require("../models/movie");
const cityModel = require("../models/City");
const theaterModel = require("../models/Theater");
const seatModel = require("../models/Seat");
const showModel = require("../models/showTime");
const convert = require("../converter");

// If the user document has the accessToken property to  something and not null 
// If the accessToken is present, you could simply have a 403 response
// If not login.


module.exports = {
// addMovies function for movie addition to the db

    async addMovies(req, res) {
        // console.log("IN ADD MOVIES CONTROLLER");
        try{

            const imageContent = convert(req.file.originalname, req.file.buffer);
            const {releaseDate} = req.body;
            const date = new Date(releaseDate);
            const image = await cloudinary.uploader.upload(imageContent);
            req.body.posterImage = image.secure_url;
            req.body.releaseDate = date;
            req.body.threatre = req.params.theatreId;
            let newMovie = new movieModel(req.body);
            const uploadedMovie = await newMovie.save();
            // console.log(uploadedMovie);
             res.status(201).send({msg:"Sucessfully Uploaded",data:uploadedMovie});
        }
        catch( err){
            res.status(400).send({ErrorMessage:err.message});
        }
    },


///--------------------------------------------------------------////
// addTheater function for addition of theater to the db
    async addTheater(req,res){
      try{
          req.body.city = req.params.cityId;
          const newTheater = new theaterModel({...req.body});
          const theater = await newTheater.save();
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
          const cuty = newcity.save();
          res.status(201).send({msg:"Sucessfully Uploaded",city:city});
        }
        catch(err){
          return res.status(400).send({ErrorMessage:err.message});
        }
  },



///----------------------------------------------------------------------////
// addThreaterToMovie function for movie distribution to a perticular theater
  async addThreaterToMovie(req,res){

    try{

        const movie = await movieModel.findById({_id:req.params.movieId});
        movie.threater.push(req.params.theatreId);
        const addMovie = await movie.save();
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
      const newShow = new showModel({...req.body}) ;
      const show = await newShow.save();
      return res.status(201).send({msg:"Sucessfully Uploaded",show:show});
    }
    catch(err){
      return res.status(400).send({ErrorMessage:err.message});
    }
  },

  // updateMovie details by updateMovie function

  async updateMovie(req, res){
    try{
      const movieId = req.params.movieId;
      const updateMovie = {...req.body};
      await movieModel.updateOne({_id: movieId},{...req.body},{new: true});
      return res.status(200).send({message: "your movie hase been updated Sucessfully", data: updateMovie});
    }
    catch(err){
      res.status(400).send({ErrorMessage:err.message});
    }
  },

  // updateTheater details

  async updateTheater(req, res){
    try{
      const theaterId = req.params.theaterId;
      const updateTheater = {...req.body};
      await theaterModel.updateOne({_id: theaterId},{...req.body},{new: true});
      return res.status(200).send({message: "your movie hase been updated Sucessfully", data: updateTheater});
    }
    catch(err){
      res.status(400).send({ErrorMessage:err.message});
    }
  },

  // update seat details

  async updateSeat(req, res){
    try{
      const seatId = req.params.seatId;
      const updateSeat = {...req.body};
      await seatModel.updateOne({_id: seatId},{updateSeat}, {new: true});
      return res.status(200).send({message: "your movie hase been updated Sucessfully", data: updateSeat});
    }
    catch(err){
      res.status(400).send({ErrorMessage:err.message});
    }
  },

  // updateShowTime details

  async updateShowTime(req, res){
    try{
      const showId = req.params.showId;
      const updateShowTime = {...req.body};
      await showModel.updateOne({_id: showId},{updateShowTime}, {new: true});
      return res.status(200).send({message: "your movie hase been updated Sucessfully", data: updateShowTime});
    }
    catch(err){
      res.status(400).send({ErrorMessage:err.message});
    }
  }


}