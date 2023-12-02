const asyncHandler = require ("express-async-handler");
const User = require("../models/userModel");
const generateToken = require ("../config/generateToken");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require("bcryptjs");

const registerUser = asyncHandler(async (req, res) => {
    console.log("r",req.body);
    const { name, email, studentnumber, password, pic } = req.body;
 
    if (!name || !email || !studentnumber || !password) {
        res.status(400);
        throw new Error ("Please enter all the Fields");
    }

    const userExists = await User.findOne({ email }); //To implement one email, one user

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const verificationToken = crypto.randomBytes(20).toString('hex');
    const  encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        studentnumber,
        password:encryptedPassword,
        pic,
        isVerified: false,
        verificationToken
    });


    if (user) {
        // Send verification email
        console.log("12"); 
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
              user: 'ilchatu2023@gmail.com',
              pass: 'wxydpjtxjkvcoikl',
            },
        });

   
        
    const mailOptions = {
            from: "ilchatu2023@gmail.com",
            to: email,
            subject: 'Email Verification',
           text: `Click the following link to verify your email: http://localhost:5000/api/auth/verify/${verificationToken}/${user.id}`,
        };
        console.log("1212"); 
        transporter.sendMail(mailOptions, (error, info) => {
            console.log("12"); 
            if (error) {
                console.log("asdfghj");
                // Rollback registration if email fails to send
                User.deleteOne({ _id: user._id })
                .then(() => {
                  console.log("asdfghjklfghjkl");
                  console.log('Registration rolled back successfully,,,');
                })
                .catch((err) => {
                  console.error('Error rolling back registration:', err);
                });
                res.status(500).send({ message: 'Internal Server Error' });
            } else {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    studentnumber: user.studentnumber,
                    pic: user.pic,
                    token: generateToken(user._id),
                    verificationToken: user.verificationToken,  
                    message: 'Verification email sent successfully',
                });
            }
        });
    } else {
        res.status(400);
        throw new Error("User not Found");
    }
});

const authUser  = asyncHandler (async (req, res) => {
    
    const {email, studentnumber, password} = req.body;
    console.log(req.body);
    const user = await User.findOne({ email, /*studentnumber*/ });
    console.log(user);
     var IsVerified= user.isVerified;
    console.log(user);
  console.log(await user.matchPassword(password))
    if (user && (IsVerified) && (await user.matchPassword(password))) {
        console.log(generateToken(user._id));
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          studentnumber: user.studentnumber,
          pic: user.pic,
          token: generateToken(user._id),

        });
    } else{
        res.status(401);
        throw new Error("Invalid Email or Password or Verify Email");
    }
});

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search 
    ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],
    }
    : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
});

module.exports = { registerUser, authUser, allUsers };