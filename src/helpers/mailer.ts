import nodemailer from "nodemailer"
import User from "@/model/userModel"
import bcryptjs from "bcryptjs"

export  const sendEmail=async ({email,emailType,userId}:any)=>{
    try {
        const hashedtoken=await bcryptjs.hash(userId.toString(),10)
      
        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken:hashedtoken,
                    verifyTokenExpiry: Date.now()+360000}
                  
                )
        }
        else if(emailType==="RESET")
        {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken:hashedtoken,
                    forgotPasswordTokenExpiry: Date.now()+360000}
                  
                )
        }


var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0573282484dca3",
      pass: "28ec405f6f5ded"
    }
  });


  const mailOptions={
    from:"barghavaramudu537@gmail.com",
    to: email,
    subject:emailType==="VERIFY"? "Verify your email":"Reset your password",
    html:`<p>Click <a href="${process.env.domain_url}/
    verifyemail?token=${hashedtoken}">here</a> to
    ${emailType==="VERIFY" ? "verify your email":"reset your password"}
    or copy and paste the below in your browser
    .<br>${process.env.domain_url}/verifyemail?token=${hashedtoken} </p>`
   }
   const mailresponse=await transport.sendMail(mailOptions);
   return mailresponse;
            
        

        
    } catch (error:any) {
      throw new Error(error.message)
        
    }
}