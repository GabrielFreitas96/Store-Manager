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

const saleService = { getAll, getById, addSale };

module.exports = saleService;