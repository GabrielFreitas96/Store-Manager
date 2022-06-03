const saleModel = require('../models/saleModel');

const getAll = async () => {
  const response = await saleModel.getAll();
  return response;
};

const getById = async (id) => {
  const response = await saleModel.getById(id);
  return response;
};

const addSale = async (arrayNewSales) => {
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