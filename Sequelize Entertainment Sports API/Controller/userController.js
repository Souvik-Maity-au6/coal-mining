const userModel = require("../models/User");
const {hash,compare} = require("bcryptjs");
// const {createTransport}= require("nodemailer");
const {sign,verify}= require("jsonwebtoken");
const cmail = require("../sendMail");
const sequelize = require("../db");
const uuid = require("uuid/v4");




module.exports = {

    // ---------------------------- Rgister user to db--------------------------- //
              async register(req,res){
                    try{
                        const {password,companyemail}= req.body;
                        const pwdRegex= "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$";
                        const pattern = new RegExp(pwdRegex);
                        // req.body.userId = uuid();
                        if(pattern.test(password))
                        {
                            const newUser = new userModel({...req.body});
                            console.log(newUser.dataValues);
                            await userModel.generateToken(newUser.dataValues);
                            console.log(newUser.dataValues.companyemail);
                            // console.log("new user token",newUser.token);
                            const user = await newUser.save();
                            let html= `<a href="http://localhost:1234/verify?token=${user.token}">Verify</a>`;
                            await cmail.mailConfig(html,newUser.dataValues);
                            return res.status(200).send({msg:"User registered sucessfully. Check your Email",token:user.token});
                        }
                        else
                        {
                          return res.send("Invalid Password");
                        }
    
                    }
                    catch(err){
                      console.log(err);
                      if(err.name='SequelizeUniqueConstraintError'){
                        console.log("Hello world")
                        return res.send({msg:err.errors[0].message});
                      }
                      return res.send({msg:err.message});
                        
                      // return res.send({msg:err.SequelizeUniqueConstraintError});
                    }
               },
    
    //----------------------------- Login user to db-----------------------//
    
                async login(req,res){
    
                  const {password,companyemail} = req.body;
                  if(!password || !companyemail)
                    return res.status(404).send({msg:"Invalid Credentials"});
                  try{
                      
                          //  console.log(companyemail);
                        const user = await userModel.findByEmailAndPassword(companyemail,password);
                        console.log("user:",user[0]);
                        // console.log(process.env.PRIVATE_KEY);
                        if(user[0].token !== null)
                          await verify(user[0].token,process.env.PRIVATE_KEY);
                        if(user[0].isauthorized === true && user[0].isloggedin === false)
                        {
                          console.log("Welcome");
                            await userModel.generateToken(user[0]);
                            await userModel.createLoggedIn(user[0]);
                            const updatedUser = await sequelize.query(`UPDATE "user" SET token='${user[0].token}',isloggedin=${user[0].isloggedin}`);                            // console.log("Hello");
                            return res.status(200).send({msg:`Welcome ${user[0].companyname}`,token:user[0].token});          
                        }
                        else if(user[0].isauthorized === true && user[0].isloggedin === true){
                          return res.status(403).send({msg:"You are already logged in"});
                        }
                        else if(user[0].isauthorized === false)
                        {
                          return res.status(200).send({msg:"Your Account is not verified. Please check your email 1"});
                        }
                }
                catch(err){
                  if(err === "Incorrect credentials")
                    return res.send({msg:err});
                  else if(err.message === "jwt expired")
                  {
                    console.log("jwt token");
                    // this is repeated code please think about it should we place it in a function to encourage dry method
                        // console.log("In catch block");
                            const user = await userModel.findByEmailAndPassword(companyemail,password);
                            user[0].isloggedin = false;
                            if(user[0].isauthorized === true && user[0].isloggedin === false)
                            {
                                await userModel.generateToken(user[0]);
                                await  userModel.createLoggedIn(user[0]);
                                console.log(user);
                                          // await user[0].save();
                                const updatedUser = await sequelize.query(`UPDATE "user" SET token='${user[0].token}',isloggedin=${true}`);
                                // const updatedUser = new userModel(user[0]);
                                // await updatedUser.save();
                                console.log(updatedUser);
                                return res.status(200).send({msg:`Welcome ${user[0].companyname}`,token:user[0].token});          
                            }
                            else if(user[0].isauthorized === false)
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
                      console.log("Current User = ",currentUser);
                      // console.log(req.user);
                      // const user = await userModel.findById(currentUser);
                      const user = await sequelize.query(`SELECT * FROM "user" WHERE Id='${currentUser}'`);
                      // console.log(user)

                      user.isloggedin=false;
                      if(user.length!==0){
                          user.token = null;
                          // await user.save();
                          await sequelize.query(`UPDATE "user"  SET isloggedin=${user.isloggedin},token=${user.token}`);
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
                              // const user = await userModel.find({_id:req.user.id});
                              const user = await sequelize.query( `SELECT * FROM "user" WHERE id=${req.user.id}`,{ type: sequelize.QueryTypes.SELECT})
                              console.log(user);
                              // const newHashPassword = await hash(newPassword,10)
                              user[0].password = await hash(newPassword,10);
                              user[0].token = null;
                              const updatedUser = await sequelize.query( `UPDATE "user"  SET password='${user[0].password}',token=${user[0].token},isloggedin=${false}`);
                              
                              console.log("updated User ====",updatedUser);
                              return res.status(201).send({msg:"Password Changed Sucessfully"});
                      }
                      else
                      {
                          return res.send("Invalid Pasword !!!!");
                      }
                }
              }
              catch(err){
                  // console.log(err);
                  return res.send({msg:err.message});
              }
          },
    
          async sendForgotPasswordEmail(req,res){
            console.log("Hello");
            const {companyEmail,newPassword} = req.body;
            if(!companyEmail || !newPassword){
                return res.send({msg:"Either you havent provides newpassword or company Email in json body"});
            }
            // const user =  await userModel.find({companyEmail:companyEmail});
            const user = await sequelize.query( `SELECT * FROM "user" WHERE companyemail='${companyEmail}'`,{ type: sequelize.QueryTypes.SELECT})
            console.log("forgot password user=",user);
            const pwdRegex = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$";
            const pattern = new RegExp(pwdRegex);
            if(pattern.test(newPassword))
            {
                if(user.length !== 0){
                  await userModel.generateToken(user[0]);
                  console.log("user :",user[0]);
                  await sequelize.query(`UPDATE "user"  SET token='${user[0].token}'`); 
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