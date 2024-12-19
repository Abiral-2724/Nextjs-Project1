import User from '@/models/userModel';
import nodemailer from 'nodemailer' ;
import bcryptjs from 'bcryptjs' ;

export const sendEmail = async({email ,emailType,userId} : unknown) => {
    try{
        // create a hashed token
       const hashedToken  = await bcryptjs.hash(userId.toString(),10) ;
       
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId ,
                {
                    verifyToken : hashedToken ,
                    verifyTokenExpiry:Date.now()+3600000
                }
               )
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId ,
                {
                    forgotPasswordToken : hashedToken ,
                    forgotPasswordTokenExpiry :Date.now()+3600000
                }
               )
        }


      // Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "fc2709f935b5a2",
      pass: "77d4d7bf674816"
    }
  });

  const mailOption = {

    from: '"Abiral jain 👻" <abiral2724@gmail.com>', // sender address
    to: email, // list of receivers
    subject: emailType === "VERIFY" ? "Verify your email ✔" : "Reset your password ✔", // Subject line
    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
  }


  const mailresponse = await transport.sendMail(mailOption) ;

  return mailresponse ;
  

      
    }
    catch(error : unknown){
        throw new Error(error.message)
    }
}