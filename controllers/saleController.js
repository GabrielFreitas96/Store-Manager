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

const addSale = async (req, res) => {
  const arrayNewSales = req.body;
  const newSales = await saleService.addSale(arrayNewSales);
  res.status(201).json(newSales);
};

const editSale = async (req, res) => {
  const { id } = req.params;
  const arrayEditSales = req.body;
  const editSales = await saleService.editSale(id, arrayEditSales);
  res.status(200).json(editSales);
};

const saleController = { getSales, getSalesById, addSale, editSale };

module.exports = saleController;