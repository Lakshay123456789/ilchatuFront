// const User = require('../models/User');

// const verifyUser = (req, res) => {

//     const verificationToken = req.params.token;
//  console.log(verificationToken);
//     User.findOne({ verificationToken }, (err, user) => {
//         if (err) {
//             return res.status(500).send({ message: 'Internal Server Error' });
//         }

//         if (!user) {
//             return res.status(404).send({ message: 'User not found' });
//         }

//         user.isVerified = true;
//         user.verificationToken = undefined;

//         user.save((err) => {
//             if (err) {
//                 return res.status(500).send({ message: 'Internal Server Error' });
//             }

//             return res.status(200).send({ message: 'User verified successfully' });
//         });
//     });
// };

// module.exports = { verifyUser };
// authController.js
const User = require ("../models/userModel");

// Verification logic
const verifyUser = async (req, res) => {
    console.log()
    const verificationToken = req.params.token;
    const userId = req.params.userId;
    console.log(verificationToken);
    console.log(userId);
    try {
        const user = await User.findOne({ _id: userId, verificationToken }).exec();
        console.log(user);
        if (!user) {
            return res.status(404).send('User not found or invalid token');
        }

        // Perform user verification logic here
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();
        console.log(user);
           // res.status(200).send("verifiy successfully");
        // Redirect or respond in a way that logs the user in
        // For example, you can redirect to the login page
       res.redirect(process.env.BASE_URL);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { verifyUser };
