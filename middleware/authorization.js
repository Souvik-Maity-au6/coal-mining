const {sign,verify}= require("jsonwebtoken");
const userModel = require("../models/User");

module.exports={

    async authorization(req,res,next){
        try{
            token = verify(req.headers.authorization,process.env.PRIVATE_KEY);
            // console.log(token);
            req.user = token;
            next();
        }
        catch(err){
            res.status(401).send({msg:"Authentication failed"});
        }
    }
}
