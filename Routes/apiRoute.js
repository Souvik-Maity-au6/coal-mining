
const {Router} = require("express");
const upload = require("../multer");
const {authorization} = require("../middleware/authorization");
const {addMovies,addTheater,addCity,addThreaterToMovie,addSeat,addShowTime, updateMovie, updateTheater, updateSeat, updateShowTime, deleteTheater, deleteSeat} = require("../Controller/apiController");
const {register,login, logout,changePassword,sendForgotPasswordEmail} = require("../Controller/userController");
const router = Router();


// ------------------------User Routes---------------------//

router.post("/register",register);
router.post("/login",login);
router.delete("/logout", authorization, logout);
router.post("/changePassword",authorization,changePassword);
router.post("/forgotPassword",sendForgotPasswordEmail);


// ----------------------------Data Routes ---------------------//

router.post("/addMovies",authorization, upload.single("posterImage"),addMovies);
router.post("/addTheater/:cityId",authorization, addTheater);
router.post("/addCity",authorization,addCity);
router.post("/addTheater/movie/:theaterId/:movieId",authorization, addThreaterToMovie);
router.post("/addSeat/:theaterId",authorization,addSeat);
router.post("/addShowTime/:movieId/:theaterId",authorization,addShowTime);
router.patch("/updateMovie/:movieId",authorization, updateMovie);
router.patch("/updateTheater/:theaterId",authorization, updateTheater);
router.patch("/updateSeat/:seatId",authorization, updateSeat);
router.patch("/updateShowTime/:showId",authorization, updateShowTime);
router.delete("/revomeTheater/:theaterId",authorization, deleteTheater);
router.delete("removeSeat/:seatId",authorization, deleteSeat)










module.exports=router;

