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

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const productId = await productService.addProduct(name, quantity);
  if (!productId) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  res.status(201).json({ id: productId, name, quantity });
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  console.log('id no Controller', id);
  console.log('name e quantity no controller', name, quantity);
  const productEdited = await productService.editProduct(id, name, quantity);
  if (!productEdited) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json({ id, name, quantity });
};

const productController = { getProducts, getProductsById, addProduct, editProduct };
module.exports = productController;
