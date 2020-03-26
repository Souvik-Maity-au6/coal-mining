
const cloudinary = require("../cloudinary");
const movieModel = require("../models/movie");
const cityModel = require("../models/City");
const threaterModel = require("../models/Theater");
const seatModel = require("../models/Seat");
const showModel = require("../models/showTime");
const userModel = require("../models/User");
const convert = require("../converter");
const {hash,compare} = require("bcryptjs");
const {createTransport}= require("nodemailer");
const {sign,verify}= require("jsonwebtoken");
// const pkey="Entertainment&SportsAPIsouvik_abhijeet";


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
            res.status(400).send({ErrorMessage:err.message});
        }
    },


///--------------------------------------------------------------////
// addTheater function for addition of theater to the db
    async addTheater(req,res){
      try{

          req.body.city = req.params.cityId;
          const newTheater = new threaterModel({...req.body});
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

      req.body.theater=req.params.theaterId;
      const newseat= new seatModel({...req.body});
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
      const newShow= new showModel({...req.body}) ;
      const show = await newShow.save();
      return res.status(201).send({msg:"Sucessfully Uploaded",show:show});
    }
    catch(err){
      return res.status(400).send({ErrorMessage:err.message});
    }
  },

  // Rgister user to db

  async register(req,res){


    try{

              const pwdRegex= "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$";
              
              // console.log(pwdRegex);
              const pattern = new RegExp(pwdRegex);
              // console.log("pat=",pattern);
              // console.log("pattern =",pattern.test(req.body.password));
              // console.log(pwdRegex.test(String(req.body.password)));
              if(pattern.test(req.body.password))
              {
                    const password = req.body.password;
                  const hashPwd = await hash(req.body.password,10);
                  if(hashPwd){
                    req.body.password=hashPwd;
                  }
                  
                  const newUser = new userModel({...req.body});
                  // console.log(newUser);
                  // console.log(newUser._id);
                  
                  
                  
                    const token = await sign({_id:newUser._id},process.env.PRIVATE_KEY,{expiresIn:60*10})
                    // console.log(token);
                    newUser.token=token;
                    const user = await newUser.save();

                // Node mailer //   
                    const transport = createTransport({
                      host:"smtp.gmail.com",
                      port: 465,
                      secure: true,
                      debug:true,
                      auth: {
                          user: process.env.GMAIL_USER,
                          pass: process.env.GMAIL_PWD,
                      },
                      tls: {
                          // do not fail on invalid certs
                          rejectUnauthorized: false
                        }
                    })
                    // const response = await transport.verify()
                    //  console.log(response);
                    //  console.log(newUser);
                    
                    const mail =await transport.sendMail({


                      from:process.env.GMAIL_USER,
                      to:newUser.companyEmail,
                      // text:`Node Mailer is done bro your email:${newUser.companyEmail} password:${password}`
                      html:`<a href="http://localhost:1234/verify?token=${newUser.token}">Verify</a>`
                    })
                    return res.status(200).send({token:token});

          
          }
          else{
            throw Error("Invalid Password");
          }
    }
    catch(err){
      console.log(err);
      return res.status(400).send({msg:err.message});
    }
  },
  async login(req,res){

    try{
        const user = await userModel.find({companyEmail:req.body.email});
        console.log(req.body.password);
        console.log(user);
        const isValid = await compare(req.body.password,user[0].password);
    
        if(user[0].isAuthorized === true){
          const token = sign({id:user[0]._id},process.env.PRIVATE_KEY,{expiresIn:60*3});
          user[0].token=token;
          await user[0].save();
          if(isValid){
            return res.status(200).send({msg:`Welcome ${user[0].companyName}`,token:token});
          }
          else{
            throw Error("Inavlid Password !!!");
          }
        }
        else{
          return res.status(400).send({msg:"Please verify your email first"});
        }
    }
    catch(err){
      return res.send(err.message);
    }
   
    
  },
  

}