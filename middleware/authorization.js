const {sign,verify}= require("jsonwebtoken");


module.exports={

    async authorization(req,res,next){

        try{

            // console.log(req.headers.authorization);
            const token = verify(req.headers.authorization,process.env.PRIVATE_KEY);

            // console.log("token:",token); ********---------------//

            req.user = token;
            next();
        }
        catch(err){
            res.status(401).send({msg:"Authentication failed"});
        }
    }
}
