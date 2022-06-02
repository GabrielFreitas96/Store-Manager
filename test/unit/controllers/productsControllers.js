const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');

describe('Ao chamar o controller de getProducts, rota "get" ', () => {
  describe('Quando o produto é retornado com sucesso', () => {
    const request = {};
    const response = {};
    const payloadProducts = [
      {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      },
      {
        id: 2,
        name: "Traje de encolhimento",
        quantity: 20
      },
      {
        id: 3,
        name: "Escudo do Capitão América",
        quantity: 30
      },
    ];
    // const returnResponse = {
    //   status: 200,
    //   json: payloadProducts,
    // };
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(payloadProducts);
      sinon.stub(productService, 'getAll').resolves(payloadProducts);
    });
    after(() => {
      productService.getAll.restore();
    });
    it('Metódo status retorna o codigo 200', async () =>{
      await productController.getProducts(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
    it('Metódo json retorna passando um array', async () =>{
      await productController.getProducts(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.true;
    });
    it('Metódo json retorna o array com os produtos', async () =>{
      await productController.getProducts(request, response);
      expect(response.json.calledWith(payloadProducts)).to.be.true;
    });
  });
});

describe('Ao chamar o contoller pelo getProductsById', () => {
  describe('Quando não existe o produto cadastrado', () => {
    const request = { params: { id: 10} };
    const response = {};

    const messageJson = { message: 'Product not found'};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(messageJson);

      sinon.stub(productService, 'getById').resolves([]);
    });
    after(() => {
      productService.getById.restore();
    });
    it('Retorna um objeto com os métodos "status" e "json" ao receber um array vazio', async () => {
      await productController.getProductsById(request, response);
      expect(response.status.calledWith(404)).to.be.true;
      expect(response.json.calledWith(messageJson)).to.be.true;
    });
  });

});