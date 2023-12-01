// const express = require('express');
// const authController = require('../controllers/authController');
// const router = express.Router();

// // router.get('/verify/:token', authController.verifyUser);

// // Example route handling verification
// router.get('/api/auth/verify/:token', (req, res) => {
//     console.log("========");
//     const verificationToken = req.params.token;

//     User.findOne({ verificationToken }, (err, user) => {
//         if (err || !user) {
//             return res.status(404).send('User not found or invalid token');
//         }

//         // Perform user verification logic here
//         user.isVerified = true;
//         user.verificationToken = undefined;
//         user.save();

//         // Redirect or respond in a way that logs the user in
//         // For example, you can redirect to the login page
//         res.redirect('/login');
//     });
// });

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const User = require ("../models/userModel");

// // router.get('/api/auth/verify/:token', (req, res) => {

// //     const verificationToken = req.params.token;
// //     const userId = req.query.userId; 
// router.get('/api/auth/verify/:token/:userId', (req, res) => {
//     const verificationToken = req.params.token;
//     const userId = req.params.userId;
//     // Extracting userId from the query parameters
//    console.log(userId);
//     User.findOne({ _id: userId, verificationToken }, (err, user) => {
//         if (err || !user) {
//             return res.status(404).send('User not found or invalid token');
//         }

//         // Perform user verification logic here
//         user.isVerified = true;
//         user.verificationToken = undefined;
//         user.save();

//         // Redirect or respond in a way that logs the user in
//         // For example, you can redirect to the login page
//         res.redirect('/login');
//     });
// });

// module.exports = router;

// authRoutes.js

const express = require('express');
const router = express.Router();

// Import necessary modules/models
const { verifyUser } = require('../controllers/authController');

// Define the verification route
router.get('/verify/:token/:userId', verifyUser);

module.exports = router;

