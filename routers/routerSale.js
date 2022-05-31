const routerSales = require('express').Router();
const saleController = require('../controllers/saleController');
const { verifySale } = require('../middlewares/verifySale');

routerSales.get('/:id', saleController.getSalesById);
routerSales.get('/', saleController.getSales);
routerSales.post('/', verifySale, saleController.addSale);

module.exports = routerSales;