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
            console.log(req.body)
            let newMovie = new movieModel(req.body);
            const uploadedMovie = newMovie.save();
             res.status(201).send({msg:"Sucessfully Uploaded",data:uploadedMovie});
        }
        catch( err){
            res.status(400).send({msg:err.message});
        }
    },

    async addTheatre(req,res){
        
        console.log("IN ADD THEATRE CONTROLLER");
        // console.log(req.body)
        const newTheater = new threatreModel({...req.body});
        console.log(req.body);        
        console.log(newTheater);
        newTheater.save();
        return res.send("DOne");

    }
}