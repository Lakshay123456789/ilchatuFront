const User = require ("../models/userModel");
const nodemailer = require('nodemailer');
const asyncHandler = require ("express-async-handler");
const crypto = require('crypto');
const bcrypt = require("bcryptjs");

const ForgotPassword = async (req, res) => {
 // console.log("forgetpassword1");
  const { email } = req.body;

  try {
      const user = await User.findOne({ email });
      console.log(user);
     // console.log("forgetpassword2");
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      const resetToken = crypto.randomBytes(20).toString('hex');
      user.verificationToken = resetToken;
      // Set token expiration if needed
      // user.resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
      await user.save();
    ///  console.log("forgetpassword3");
      const link = `${process.env.BASE_URL}ResetNewPassword/${user._id}/${resetToken}`;

      const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
              user: 'ilchatu2023@gmail.com',
              pass: 'wxydpjtxjkvcoikl',
          },
      });

      const mailOptions = {
          from: 'ilchatu2023@gmail.com',
          to: email,
          subject: 'Email Verification',
          text: `Click the following link to reset your password: ${link}`,
      };
     // console.log("forgetpassword4");
      await transporter.sendMail(mailOptions);
     // console.log("forgetpassword5");
      res.json({ message: 'Password reset email sent' });
  } catch (error) {
    //console.log("forgetpassword");
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


const NewpasswordSet = async (req ,res) =>{
  //console.log("ResetNewPassword1");
  console.log(req.body);
  const { userId,token,password} =req.body;

  if ( !token || !userId || !password) {
    res.status(400);
    throw new Error ("Please enter all the Fields");
}
try{
 // console.log("ResetNewPassword2");
  const user = await User.findOne({ _id: userId ,verificationToken:token }).exec();
  console.log(user);
  //console.log("ResetNewPassword3");
  if (!user) {
    return res.status(404).send('User not found or invalid token');
  }
  //console.log("ResetNewPassword4");
  user.verificationToken = undefined
  const  encryptedPassword = await bcrypt.hash(password, 10);
  console.log(encryptedPassword);
  //console.log("ResetNewPassword5");
   user.password= encryptedPassword;
   console.log(user);
   await user.save();
   //console.log("ResetNewPassword5");
   console.log(user);
   res.status(200).send("Reset Send Successfully");
}catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

}
module.exports ={ForgotPassword ,NewpasswordSet } ;
  