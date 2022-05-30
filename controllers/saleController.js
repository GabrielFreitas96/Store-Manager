const saleService = require('../services/saleService');

const getSales = async (req, res) => {
  const sales = await saleService.getAll();
  res.status(200).json(sales); 
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.getById(+id);
  if (sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  res.status(200).json(sale);
};

const saleController = { getSales, getSalesById };

module.exports = saleController;