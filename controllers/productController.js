const productService = require('../services/productService');

const getProducts = async (req, res) => {
  const products = await productService.getAll();
  res.status(200).json(products);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getById(+id);
  res.status(200).json(product);
};

const productController = { getProducts, getProductsById };
module.exports = productController;
