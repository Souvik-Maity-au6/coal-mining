
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
            
            
            
            const token = await sign({_id:newUser._id},process.env.PRIVATE_KEY,{expiresIn:60*3})
            // console.log(token);
            newUser.token = "1stTime "+token;
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
    const user = await userModel.find({companyEmail:req.body.companyEmail});
    try{
      /// checks for empty user
        if(user.length!=0)
        {
            let token;
            let check=null;
                // checks whether user token created in  1st Time logging or created after expiry is valid
                if(user[0].token.includes("1stTime") || user[0].token.includes("new")){
                   token = verify(user[0].token.split(" ")[1],process.env.PRIVATE_KEY);
                   check = user[0].token.split(" ")[0];
                }
                // checks whether already logged in user token is valid or not
                else
                {
                    token = verify(user[0].token,process.env.PRIVATE_KEY);   
                }
            console.log("token:",token);
            const isValid = await compare(req.body.password,user[0].password);

            if(isValid)
            {
                if(user[0].token === null || check==="1stTime")
                {
                      if(user[0].isAuthorized === true)
                      {
                              const token = sign({id:user[0]._id},process.env.PRIVATE_KEY,{expiresIn:60*1});
                              user[0].token = token;
                              await user[0].save();
                              return res.status(200).send({msg:`Welcome ${user[0].companyName}`,token:token});          
                      }
                      else
                      {
                        return res.send({msg:"Verify First"});
                      }
                }
                // if token is created after expiry then remove the new and assign valid token here no new token is created
                else if (check==="new"){
                  user[0].token = user[0].token.split(" ")[1];
                  await user[0].save()
                  return res.status(200).send({msg:`Welcome ${user[0].companyName}`,token:user[0].token});
                }
                // if user try to login again within the expiry time
                else{
                  return res.status(400).send({message: "You are already loggedin"});
                }
            }
            else
            {
               return res.status(404).send({msg:"Invalid Credentials !!!"});
            }
        }
        else
        {
            return res.status(404).send({msg:"Invalid Credentials"});
        }  
     }
    catch(err){
      if(err.message === "jwt expired"){
        // here assign new token if sesssion is expired
        user[0].token = "new "+sign({id:user[0]._id},process.env.PRIVATE_KEY,{expiresIn:60*1});
        await user[0].save()
        return res.status(400).send("Your Seesion is expired please login again !!!");
      }
      return res.status(500).send({msg:err.message});
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