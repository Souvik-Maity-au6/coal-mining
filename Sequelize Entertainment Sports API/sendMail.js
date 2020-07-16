const {createTransport}= require("nodemailer");
module.exports={

      async mailConfig(html,newUser){


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
        const response = await transport.verify();
        console.log(response);
            const mail = await transport.sendMail({


                from: process.env.GMAIL_USER,
                to: newUser.companyemail,
                // text:`Node Mailer is done bro your email:${newUser.companyEmail} password:${password}`
                html: html
            })
          }
}