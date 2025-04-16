const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ message: "Product added", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProducts = async (req, res) => {
  const products = await Product.find();
//   res.json(products);
  res.json({ products });

};

module.exports = { addProduct, getProducts };
