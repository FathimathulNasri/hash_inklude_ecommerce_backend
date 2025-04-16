const twilio = require("twilio");
require("dotenv").config();

const otpStore = {}; // In-memory store

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (mobile) => {
  const otp = generateOTP();
  const expiresAt = Date.now() + 5 * 60 * 1000;
  otpStore[mobile] = { otp, expiresAt };

  // Ensure WhatsApp format: 'whatsapp:+91xxxxxxx'
  const formattedNumber = `whatsapp:${mobile}`;

  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: formattedNumber,
      body: `Your OTP for registration is: ${otp}`,
    });

    console.log(`OTP sent to ${mobile}: ${otp}`);
    return otp;
  } catch (err) {
    console.error("Twilio WhatsApp error:", err);
    throw new Error("Failed to send OTP via WhatsApp");
  }
};

const verifyOTP = (mobile, otp) => {
  const data = otpStore[mobile];
  if (!data) throw new Error("OTP not found. Please request a new one.");
  if (Date.now() > data.expiresAt) {
    delete otpStore[mobile];
    throw new Error("OTP expired.");
  }
  if (data.otp !== otp) throw new Error("Invalid OTP.");
  delete otpStore[mobile];
  return true;
};

module.exports = { sendOTP, verifyOTP };