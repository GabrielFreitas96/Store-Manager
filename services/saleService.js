const saleModel = require('../models/saleModel');

const getAll = async () => {
  const response = await saleModel.getAll();
  return response;
};

const getById = async (id) => {
  const response = await saleModel.getById(id);
  return response;
};

const saleService = { getAll, getById };

module.exports = saleService;