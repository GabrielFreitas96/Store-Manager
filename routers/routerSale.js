const routerSales = require('express').Router();
const saleController = require('../controllers/saleControler');

routerSales.use('/', saleController.getSales);

module.exports = routerSales;