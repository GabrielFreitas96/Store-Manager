const saleModel = require('../models/saleModel');
const productModel = require('../models/productModel');

const getAll = async () => {
  const response = await saleModel.getAll();
  return response;
};

const getById = async (id) => {
  const response = await saleModel.getById(id);
  return response;
};

const addSale = async (arrayNewSales) => {
  const allProducts = await productModel.getAll();
  let responseBollean = true;
  // console.log('todos os produtos', allProducts); 
  allProducts.forEach(({ id, quantity }) => {
    const noQuantity = arrayNewSales
    .some((element) => element.productId === id && element.quantity > quantity);
    // console.log('NoQuantity', noQuantity);
    if (noQuantity) { 
      // console.log('entrou no if');
      responseBollean = false; 
    }
  });
  if (!responseBollean) {
    return null;
  }
  const response = await saleModel.addSale(arrayNewSales);
  return response;
};

const editSale = async (id, arrayEditSales) => {
  const response = await saleModel.editSale(id, arrayEditSales);
  return response;
};
const deleteSale = async (id) => {
  const saleToBeDelete = await saleModel.getById(id);
  if (saleToBeDelete.length === 0) {
    return null;
  }
  const saleDeleted = await saleModel.deleteSale(id);
  return saleDeleted;
};
const saleService = { getAll, getById, addSale, editSale, deleteSale };

module.exports = saleService;