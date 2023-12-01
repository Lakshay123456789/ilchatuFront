const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
// const generateToken = (id) => {
//     return jwt.sign({ id },"ilchatu", {
//         expiresIn: "30d",
//     });
//};

module.exports = generateToken; 