
const {Router} = require("express");
const upload = require("../multer1");
const cloudinary = require("../cloudinary");
const router = Router();
const {addMovies,addTheatre} = require("../Controller/apiController");

router.post("/addMovies",upload.single("posterImage"),addMovies);
router.post("/addTheatre",addTheatre);

module.exports=router;

