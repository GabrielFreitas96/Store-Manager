const productModel = require('../models/productModel');

const getAll = async () => {
  const response = await productModel.getAll();
  return response;
};

const getById = async (id) => {
  const response = await productModel.getById(id);
  return response;
};

const addProduct = async (name, quantity) => {
  const searchName = await productModel.getByName(name);
  if (searchName && searchName.name === name) {
    // console.log('objeto já existe');
    return null;
  }
  const responseId = await productModel.addProduct(name, quantity);
  console.log('Add product no Service', responseId);
  return responseId; 
};

const productService = { getAll, getById, addProduct };
module.exports = productService;