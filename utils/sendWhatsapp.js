const twilio = require("twilio");
require("dotenv").config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


const sendWhatsApp = async (mobile, message) => {
  try {
    const to = `whatsapp:${mobile}`; // adjust based on format

    await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio sandbox
      to,
      body: "🛒 Your cart is abandoned. Come back and complete your purchase!"
    });

    console.log(`✅ WhatsApp message sent to ${mobile}`);
  } catch (err) {
    console.error("❌ Failed to send WhatsApp:", err.message);
  }
};

module.exports = sendWhatsApp;
