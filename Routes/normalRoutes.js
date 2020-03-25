const {Router} = require("express");
const {searchTheater,getAllMovies, getSingleMovie} = require("../Controller/normalController");
const router = Router();



router.get("/searchTheater",searchTheater);
router.get("/allMovies",getAllMovies);
router.get("/singleMovie",getSingleMovie);


module.exports = router;
