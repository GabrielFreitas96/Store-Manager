const saleModel = require('../models/saleModel');

const getAll = async () => {
  const response = await saleModel.getAll();
  return response;
};

const saleService = { getAll };

module.exports = saleService;