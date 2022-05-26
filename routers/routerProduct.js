const routerProduct = require('express').Router();
const productController = require('../controllers/productController');

routerProduct.use('/', productController.getProducts);

module.exports = routerProduct;