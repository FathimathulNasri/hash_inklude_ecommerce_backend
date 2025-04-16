const Cart = require("../models/Cart");
const Product = require("../models/Product");
const cartService = require("../services/cartService"); // Ensure correct import

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [{ productId, quantity }] });
  } else {
    const itemIndex = cart.items.findIndex(i => i.productId.equals(productId));
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }
  cart.notified = false; // reset notification flag
  await cart.save();
  res.json({ message: "Added to cart", cart });
};

const getCart = async (req, res) => {
  const { userId } = req.params;
  const cart = await Cart.findOne({ userId }).populate("items.productId");
  
  res.json({cart});
};


const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedCart = await cartService.clearCartByUserId(userId);
    res.status(200).json({ message: "Cart cleared successfully", cart: updatedCart });
  } catch (error) {
    console.error("Error clearing cart:", error.message);
    res.status(500).json({ message: error.message });
  }
};
const deleteItemFromCartWithBody = async (req, res) => {
  const { userId, productId } = req.body;
  
  try {
    const updatedCart = await cartService.deleteCartItem(userId, productId);
    res.status(200).json({ message: "Item removed from cart", cart: updatedCart });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

  
module.exports = { addToCart, getCart, clearCart, deleteItemFromCartWithBody};
