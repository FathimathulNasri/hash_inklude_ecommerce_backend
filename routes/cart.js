const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");

router.post("/add", CartController.addToCart);
router.get("/:userId", CartController.getCart);
router.delete("/clear/:userId", CartController.clearCart);
router.delete("/item", CartController.deleteItemFromCartWithBody);

module.exports = router;
