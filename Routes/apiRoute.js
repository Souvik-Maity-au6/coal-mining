
const {Router} = require("express");
const upload = require("../multer");
const {authorization} = require("../middleware/authorization");
const {addMovies,addTheater,addCity,addThreaterToMovie,addSeat,addShowTime,register,login} = require("../Controller/apiController");
const router = Router();


router.post("/register",register);
router.post("/login",login);


router.post("/addMovies",authorization,upload.single("posterImage"),addMovies);
router.post("/addTheater/:cityId",authorization,addTheater);
router.post("/addCity",authorization,addCity);
router.post("/addTheater/movie/:theatreId/:movieId",authorization,addThreaterToMovie);
router.post("/addSeat/:theaterId",authorization,addSeat);
router.post("/addShowTime/:movieId/:theaterId",addShowTime);










module.exports=router;

