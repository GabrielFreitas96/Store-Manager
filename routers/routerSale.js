const routerSales = require('express').Router();
const saleController = require('../controllers/saleController');
const { verifySale } = require('../middlewares/verifySale');
const verifyEditSale = require('../middlewares/verifyEditSale');

routerSales.get('/:id', saleController.getSalesById);
routerSales.get('/', saleController.getSales);
routerSales.post('/', verifySale, saleController.addSale);
routerSales.put('/:id', verifyEditSale, saleController.editSale);

module.exports = routerSales;