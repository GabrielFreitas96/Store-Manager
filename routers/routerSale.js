const routerSales = require('express').Router();
const saleController = require('../controllers/saleControler');

routerSales.use('/:id', saleController.getSalesById);
routerSales.use('/', saleController.getSales);

module.exports = routerSales;