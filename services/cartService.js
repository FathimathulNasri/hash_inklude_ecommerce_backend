// services/cartService.js
const Cart = require("../models/Cart");

const clearCartByUserId = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = [];
  await cart.save();
  return cart;
};


const deleteCartItem = async (userId, productId) => {
  // Find the cart for the user
  const cart = await Cart.findOne({ userId });

  // If the cart doesn't exist, throw an error
  if (!cart) {
    throw new Error("Cart not found");
  }

  // Filter the items in the cart to remove the productId
  const initialLength = cart.items.length;
  cart.items = cart.items.filter(item => item.productId.toString() !== productId);

  // If no item was removed (item not found), throw an error
  if (cart.items.length === initialLength) {
    throw new Error("Product not found in cart");
  }

  // Save the updated cart to the database
  await cart.save();

  // Return the updated cart
  return cart;
};

module.exports = { clearCartByUserId, deleteCartItem };
