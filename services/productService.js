const productModel = require('../models/productModel');

const getAll = async () => {
  const response = await productModel.getAll();
  return response;
};

const productService = { getAll };
module.exports = productService;