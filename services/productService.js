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
    return null;
  }
  const responseId = await productModel.addProduct(name, quantity);
  return responseId; 
};

const editProduct = async (id, name, quantity) => {
 const productToBeEdit = await productModel.getById(id);
 if (productToBeEdit.length === 0) {
   return null;
 }
 const productEdited = await productModel.editProduct(id, name, quantity);
 return productEdited;
};

const deleteProduct = async (id) => {
  const productToBeDelete = await productModel.getById(id);
  if (productToBeDelete.length === 0) {
    return null;
  }
  const productDeleted = await productModel.deleteProduct(id);
  return productDeleted;
};

const productService = { getAll, getById, addProduct, editProduct, deleteProduct };
module.exports = productService;