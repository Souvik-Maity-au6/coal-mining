const {Router} = require("express");
const {searchTheater,getAllMovies, getSingleMovie,verify} = require("../Controller/normalController");
const router = Router();



router.get("/searchTheater",searchTheater);
router.get("/allMovies",getAllMovies);
router.get("/singleMovie",getSingleMovie);
router.get("/verify",verify);


module.exports = router;
