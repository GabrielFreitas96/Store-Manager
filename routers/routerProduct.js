const routerProduct = require('express').Router();
const productController = require('../controllers/productController');
const verifyProduct = require('../middlewares/verifyProduct');

routerProduct.get('/:id', productController.getProductsById);
routerProduct.get('/', productController.getProducts);
routerProduct.post('/', verifyProduct, productController.addProduct);

module.exports = routerProduct;