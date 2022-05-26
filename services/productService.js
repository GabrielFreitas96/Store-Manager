const productModel = require('../models/productModel');

const getAll = async () => {
  const response = await productModel.getAll();
  return response;
};

const getById = async (id) => {
  const response = await productModel.getById(id);
  return response;
};

const productService = { getAll, getById };
module.exports = productService;