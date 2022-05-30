const routerSales = require('express').Router();
const saleController = require('../controllers/saleController');

routerSales.get('/:id', saleController.getSalesById);
routerSales.get('/', saleController.getSales);

module.exports = routerSales;