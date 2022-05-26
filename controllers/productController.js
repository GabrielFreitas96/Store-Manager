const productService = require('../services/productService');

const getProducts = async (req, res) => {
  const products = await productService.getAll();
  res.status(200).json(products);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getById(+id);
  if (product.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(product[0]);
};

const productController = { getProducts, getProductsById };
module.exports = productController;
