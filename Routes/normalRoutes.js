const {Router} = require("express");
const {searchTheater,getAllMovies, getSingleMovie,verify,resendEmail,resetPassword, searchUpcomingMovie} = require("../Controller/normalController");
const router = Router();



router.get("/searchTheater",searchTheater);
router.get("/allMovies",getAllMovies);
router.get("/singleMovie",getSingleMovie);
router.get("/resendEmail",resendEmail);
router.get("/verify",verify);
router.get("/forgotPassword/:newPassword",resetPassword);
router.get("/searchUpcomingMovie", searchUpcomingMovie);


module.exports = router;
