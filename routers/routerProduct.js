const routerProduct = require('express').Router();
const productController = require('../controllers/productController');
const verifyProduct = require('../middlewares/verifyProduct');

routerProduct.get('/:id', productController.getProductsById);
routerProduct.get('/', productController.getProducts);
routerProduct.post('/', verifyProduct, productController.addProduct);
routerProduct.put('/:id', verifyProduct, productController.editProduct);
routerProduct.delete('/:id', productController.deleteProduct);
module.exports = routerProduct;