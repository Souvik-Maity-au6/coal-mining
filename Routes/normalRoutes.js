const {Router} = require("express");
const {searchTheater,getAllMovies, getSingleMovie,verify,resendEmail,resetPassword, 
        searchUpcomingMovie,getTopRatedMovies,getAllCurrentMovies,getSeatDetails,
        searchTheaterByCity,searchTheaterByAvailableScreen,getShowTiming, searchSingleTvSeries, searchUpcomingTvSeries,
        searchCurrentTvSeries, searchEvent, searchCityEvents, searchSports, searchCitySports} = require("../Controller/normalController");
const router = Router();


// Data releted get routes

router.get("/getShowtimings",getShowTiming);
router.get("/getTheaterByAvailableScreen",searchTheaterByAvailableScreen);
router.get("/getTheaterByCity",searchTheaterByCity);
router.get("/getSeatDetails",getSeatDetails);      
router.get("/searchTheater",searchTheater);
router.get("/allMovies",getAllMovies);
router.get("/singleMovie",getSingleMovie);
router.get("/getTopRatedMovies",getTopRatedMovies);
router.get("/getCurrentlyRunningMovies",getAllCurrentMovies);
// router.get("/getTheater",search);
router.get("/searchUpcomingMovie", searchUpcomingMovie);
router.get("/searchSingleTvSeries", searchSingleTvSeries);
router.get("/searchUpcomingTvSeries", searchUpcomingTvSeries);
router.get("/searchCurrentTvSeries", searchCurrentTvSeries);
router.get("/searchEvent", searchEvent);
router.get("/searchCity/event", searchCityEvents);
router.get("/searchSports", searchSports);
router.get("/searchCity/sports", searchCitySports);




// user related get routes

router.get("/resendEmail",resendEmail);
router.get("/verify",verify);
router.get("/forgotPassword/:newPassword",resetPassword);



module.exports = router;
