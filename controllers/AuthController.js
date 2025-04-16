const User = require("../models/User");
const OTPService = require("../services/OTPService");

const sendOtp = async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ message: "Mobile is required" });
  try {
    OTPService.sendOTP(mobile);
    res.json({ message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const verifyOtpAndRegister = async (req, res) => {
  const { name, mobile, otp } = req.body;
  if (!name || !mobile || !otp) return res.status(400).json({ message: "All fields are required" });

  try {
    OTPService.verifyOTP(mobile, otp);
    let existingUser = await User.findOne({ mobile });
    if (existingUser) return res.status(409).json({ message: "User already registered" });

    const user = new User({ name, mobile });
    await user.save();

    res.json({ message: "Registration successful", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const verifyOtpAndLogin = async (req, res) => {
    const { mobile, otp } = req.body;
    if (!mobile || !otp)
      return res.status(400).json({ message: "Mobile and OTP are required" });
  
    try {
      OTPService.verifyOTP(mobile, otp);
  
      const user = await User.findOne({ mobile });
      if (!user)
        return res.status(404).json({ message: "User not found. Please sign up." });
  
      // Optionally: create a token or session here
  
      res.json({ message: "Login successful", user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

module.exports = { sendOtp, verifyOtpAndRegister,verifyOtpAndLogin };
