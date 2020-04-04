
const userModel = require("../models/User");
const {hash,compare} = require("bcryptjs");
// const {createTransport}= require("nodemailer");
const {sign,verify}= require("jsonwebtoken");
const cmail = require("../sendMail");



module.exports = {

// ---------------------------- Rgister user to db--------------------------- //

  async register(req,res){

        try{
            const {password,companyEmail} = req.body;
            const pwdRegex= "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$";
            const pattern = new RegExp(pwdRegex);
            if(pattern.test(password))
            {
                const newUser = new userModel({...req.body});
                 await newUser.generateToken();
                // console.log("new user token",newUser.token);
                const user = await newUser.save();
                let html= `<a href="http://localhost:1234/verify?token=${user.token}">Verify</a>`;
                await cmail.mailConfig(html,newUser);
                return res.status(200).send({msg:"User registered sucessfully. Check your Email",Warning:"Didnot get email?Update your email",token:user.token});
            }
            else
            {
              return res.send("Invalid Password");
            }

        }
        catch(err){
          console.log(err);
            return res.send({msg:err.message});
        }
    },

    // --------------------------Change User Email-------------------------//

    async changeEmail(req,res){
        try{
               const updateEmail = await userModel.updateOne({token: req.headers.authorization},{...req.body}, {new: true});
               console.log(updateEmail);
               if(updateEmail.nModified !== 0){
                const updatedUser = await userModel.find({companyEmail: req.body.companyEmail});
              //  console.log(updatedUser)
              let html= `<a href="http://localhost:1234/verify?token=${req.headers.authorization}">Verify</a>`;
              await cmail.mailConfig(html,updatedUser[0]);
              return res.status(200).send({msg:"Check your Email for varyfication"});
               }
               return res.status(400).send("Authentication failed");
               
          }
        catch(err){
          return res.send({msg:err.message});
        }
              
        },

//----------------------------- Login user to db-----------------------//

        async login(req,res){


          const {password,companyEmail} = req.body;
            if(!password || !companyEmail)
            return res.status(404).send({msg:"Invalid Credentials"});
          try{
                
                  // console.log(companyEmail);
                const user = await userModel.findByEmailAndPassword(companyEmail,password);
                if(user[0].token !== null)
                  verify(user[0].token,process.env.PRIVATE_KEY);
                if(user[0].isAuthorized === true && user[0].isLoggedIn === false)
                {
                    user[0].generateToken();
                    user[0].createLoggedIn();
                    await user[0].save();
                    return res.status(200).send({msg:`Welcome ${user[0].companyName}`,token:user[0].token});          
                }
                else if(user[0].isAuthorized === true && user[0].isLoggedIn === true){
                  return res.status(403).send({msg:"You are already logged in"});
                }
                else if(user[0].isAuthorized === false)
                {
                    return res.status(200).send({msg:"Your Account is not verified. Please check your email"});
                }
          }
          catch(err){
            if(err === "Incorrect credentials")
              return res.send({msg:err});
            else if(err.message === "jwt expired")
            {
              // this is repeated code please think about it should we place it in a function to encourage dry method
                  // console.log("In catch block");
                  const user = await userModel.findByEmailAndPassword(companyEmail,password);
                  user[0].isLoggedIn = false;
                  if(user[0].isAuthorized === true && user[0].isLoggedIn === false)
                  {
                      user[0].generateToken();
                      user[0].createLoggedIn();
                      await user[0].save();
                      return res.status(200).send({msg:`Welcome ${user[0].companyName}`,token:user[0].token});          
                  }
                  else if(user[0].isAuthorized === false)
                  {
                    return res.status(200).send({msg:"Your Account is not verified. Please check your email"});
                  }
            }
          }
        },

//---------------------------------   Logout user to db--------------------//

  async logout(req, res){
      try{
        // console.log("Hello");
          const currentUser = req.user.id;
          // console.log(req.user);
          const user = await userModel.findById(currentUser);
          user.isLoggedIn=false;
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
  },


///---------------------------------- Change Password ---------------------------------------------///
    async changePassword(req,res)
    {

      try{
        const {companyEmail,oldPassword,newPassword} = req.body;
        if(!newPassword)
        {
          return res.status(403).send({msg:"Bad Request"});
        }
        else{
            const pwdRegex = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$";
            const pattern = new RegExp(pwdRegex);
              if(pattern.test(newPassword))
              {
                      const user = await userModel.find({_id:req.user.id});
                      // console.log(user);
                      // const newHashPassword = await hash(newPassword,10)
                      user[0].password = newPassword;
                      user[0].token = null;
                      user[0].save()
                      return res.status(201).send({msg:"Password Changed Sucessfully"});
              }
              else
              {
                  return res.send("Invalid Pasword !!!!");
              }
        }
      }
      catch(err){
          return res.send({msg:err.message});
      }
  },

  async sendForgotPasswordEmail(req,res){

    const {companyEmail,newPassword} = req.body;
    if(!companyEmail || !newPassword){
        return res.send({msg:"Either you havent provides newpassword or company Email in json body"});
    }
    const user =  await userModel.find({companyEmail:companyEmail});
    const pwdRegex = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$";
    const pattern = new RegExp(pwdRegex);
    if(pattern.test(newPassword))
    {
        if(user.length !== 0){
          user[0].generateToken();
          await user[0].save();
          let html= `<a href="http://localhost:1234/forgotPassword/${newPassword}?token=${user[0].token}">Click Here to change the password</a>`;
          const email = await cmail.mailConfig(html,user[0]);
          return res.status(200).send({msg:"Change Password link has been send . Please Check your Email to change password",token:user.token});        }
        else{
          return res.send({msg:"Sorry user with this email id doesnot exist"});
        }
    }
    else
    {
      return res.send({msg:"Invalid New Password"});
    }
    
  }   
}