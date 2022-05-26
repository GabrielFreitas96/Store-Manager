const routerSales = require('express').Router();
const saleController = require('../controllers/saleController');

routerSales.use('/:id', saleController.getSalesById);
routerSales.use('/', saleController.getSales);

module.exports = routerSales;