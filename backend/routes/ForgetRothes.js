const express = require('express');
const router = express.Router();


const { ForgotPassword,NewpasswordSet} = require("../controllers/ForgetController");

router.post('/forget-password', ForgotPassword);
router.post('/SetNewpassword',NewpasswordSet);

module.exports = router;