const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/send-otp", AuthController.sendOtp);
router.post("/verify-otp-register", AuthController.verifyOtpAndRegister);
router.post("/verify-otp-login", AuthController.verifyOtpAndLogin);

module.exports = router;
