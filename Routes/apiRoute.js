
const {Router} = require("express");
const upload = require("../multer1");
const cloudinary = require("../cloudinary");
const router = Router();
const {addMovies,addTheatre,addCity,addThreaterToMovie,searchTheatre,getAllMovies} = require("../Controller/apiController");

router.post("/addMovies",upload.single("posterImage"),addMovies);
router.post("/addTheatre/:cityId",addTheatre);
router.post("/addCity",addCity);
router.post("/addMovies/:theatreId/:movieId",addThreaterToMovie);
router.get("/searchTheatre",searchTheatre);
router.get("/allMovies",getAllMovies);

module.exports=router;

