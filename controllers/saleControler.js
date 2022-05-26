const saleService = require('../services/saleService');

const getSales = async (req, res) => {
  const sales = await saleService.getAll();
  res.status(200).json(sales); 
};

const saleController = { getSales };

module.exports = saleController;