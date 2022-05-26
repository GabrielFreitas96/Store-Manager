const productService = require('../services/productService');

const getProducts = async (req, res) => {
  const products = await productService.getAll();
  res.status(200).json(products);
};

const productController = { getProducts };
module.exports = productController;
