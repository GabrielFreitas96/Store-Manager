const routerProduct = require('express').Router();
const productController = require('../controllers/productController');

routerProduct.use('/:id', productController.getProductsById);
routerProduct.use('/', productController.getProducts);

module.exports = routerProduct;