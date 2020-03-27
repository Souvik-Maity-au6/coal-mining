
const userModel = require("../models/User");
const {hash,compare} = require("bcryptjs");
const {createTransport}= require("nodemailer");
const {sign,verify}= require("jsonwebtoken");



module.exports = {

// ---------------------------- Rgister user to db--------------------------- //

  async register(req,res){


    try{

        const pwdRegex= "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$";
        
        // console.log(pwdRegex);
        const pattern = new RegExp(pwdRegex);
        // console.log("pat=",pattern);
        // console.log("pattern =",pattern.test(req.body.password));
        // console.log(pwdRegex.test(String(req.body.password)));
        if(pattern.test(req.body.password))
        {
            const password = req.body.password;
            const hashPwd = await hash(req.body.password,10);
            if(hashPwd){
            req.body.password=hashPwd;
            }
            
            const newUser = new userModel({...req.body});
            // console.log(newUser);
            // console.log(newUser._id);
            
            
            
            const token = await sign({_id:newUser._id},process.env.PRIVATE_KEY,{expiresIn:60*10})
            // console.log(token);
            newUser.token = token;
            const user = await newUser.save();

//--------------------- Node mailer------------------------------- //   

            const transport = createTransport({
                host:"smtp.gmail.com",
                port: 465,
                secure: true,
                debug:true,
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PWD,
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false
                }
            })
            const response = await transport.verify()
            //  console.log(response);
            //  console.log(newUser);
            
            const mail = await transport.sendMail({


                from: process.env.GMAIL_USER,
                to: newUser.companyEmail,
                // text:`Node Mailer is done bro your email:${newUser.companyEmail} password:${password}`
                html: `<a href="http://localhost:1234/verify?token=${newUser.token}">Verify</a>`
            })
            return res.status(200).send({token:token});

    
          }
          else{
            throw Error("Invalid Password");
          }
    }
    catch(err){
      console.log(err);
      return res.status(400).send({msg:err.message});
    }
  },

//----------------------------- Login user to db-----------------------//

  async login(req,res){

    try{

        const user = await userModel.find({companyEmail:req.body.companyEmail});
        // console.log(req.body.password);
        // console.log(user);
        const isValid = await compare(req.body.password,user[0].password);
        if(user[0].token === null){
            if(user[0].isAuthorized === true){
                const token = sign({id:user[0]._id},process.env.PRIVATE_KEY,{expiresIn:60*10});
                user[0].token = token;
                await user[0].save();
                if(isValid){
                    return res.status(200).send({msg:`Welcome ${user[0].companyName}`,token:token});
          }
          else{
            throw Error("Inavlid Password !!!");
          }
        }
        else{
          return res.status(400).send({msg:"Please verify your email first"});
        }
        }else{
            const token = verify(user[0].token,process.env.PRIVATE_KEY);
            if(token){
                return res.status(400).send({message: "You are already loggedin"});
            }
        }   
    }
    catch(err){
      return res.send(err.message);
    }
  },

//---------------------------------   Logout user to db--------------------//

async logout(req, res){
    try{
        const currentUser = req.user.id;
        const user = await userModel.findById(currentUser);
        // console.log(user)
        if(user){
            user.token = null;
            await user.save();
            return res.send("Thank you visit again")
        }else{
            throw Error("Please Login first")
        }
    }
    catch(err){
        return res.send(err.message);
    }
}
}