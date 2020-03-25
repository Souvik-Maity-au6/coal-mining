
const {Router} = require("express");
const upload = require("../multer");
const {addMovies,addTheater,addCity,addThreaterToMovie} = require("../Controller/apiController");
const router = Router();



router.post("/addMovies",upload.single("posterImage"),addMovies);
router.post("/addTheater/:cityId",addTheater);
router.post("/addCity",addCity);
router.post("/addTheater/movie/:theatreId/:movieId",addThreaterToMovie);










module.exports=router;

