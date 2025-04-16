const cron = require('node-cron');
const Cart = require("../models/Cart");
const sendWhatsApp = require("../utils/sendWhatsApp"); // See below

cron.schedule('* * * * *', async () => {
  const fiveMinutesAgo = new Date(Date.now() - 1 * 60 * 1000);

  const carts = await Cart.find({
    lastUpdated: { $lte: fiveMinutesAgo },
    notified: false,
    "items.0": { $exists: true }
  }).populate("userId");

  for (let cart of carts) {
    if (cart.userId?.mobile) {
      await sendWhatsApp(
        cart.userId.mobile,
        "👋 Hey! You left items in your cart. Checkout now before they're gone!"
      );
      cart.notified = true;
      await cart.save();
    }
  }
});
