const routerProduct = require('express').Router();
const productController = require('../controllers/productController');

routerProduct.get('/:id', productController.getProductsById);
routerProduct.get('/', productController.getProducts);
// routerProduct.post('/', productController.addProduct);

module.exports = routerProduct;