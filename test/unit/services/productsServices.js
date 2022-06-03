const sinon = require('sinon');
const { expect } = require('chai');

const productService = require('../../../services/productService');
const productModel = require('../../../models/productModel');

describe('Busca todos os produtos no Banco de Dados ', ()=> {
  describe('Quando todos os produtos são encontrados', () => {
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
  before( async () => {
      sinon.stub(productModel, 'getAll').resolves(payloadProducts);
    });
  after(() => {
      productModel.getAll.restore();
  });
  it('Espera ser um array', async() => {
        const response = await productService.getAll();
        // console.log('response', response);
        expect(response).to.be.an('array');
        // expect(response).to.be.deep.equal(payloadProducts);
  });
  it('Todos os produtos são encontrados', async() => {
    const response = await productService.getAll();
    expect(response).to.be.deep.equal(payloadProducts);
  });
  it('Todos os produtos são encontrados e possuem as chaves desejadas "id", "name", "quantity"', async() => {
    const response = await productService.getAll();
    response.forEach((item) => {
      expect(item).to.include.all.keys('id','name','quantity');
    });
  });

  });
  
  describe('Quando o produto não é encontrado', () => {
    before( async () => {
      const resultProducts = [];
      sinon.stub(productModel, 'getAll').resolves(resultProducts);
    }); 
    after(() => {
      productModel.getAll.restore();
    });

    it('Espera o retorno ser um array', async () => {
      const response = await productService.getAll();
      expect(response).to.be.an('array');
    });
    it('Espera que o array esteja vazio', async () => {
      const response = await productService.getAll();
      expect(response).to.be.empty;
    });

  });

});

describe('Busca um determinado produto no banco de dados com base no ID', () => {
  describe('Quando o id inserido retorna um produto', () => {
    const productId = [{
      id: 1,
      name: "Martelo de Thor",
      quantity: 10,
    }];
    before( async () => {
      sinon.stub(productModel, 'getById').resolves(productId);
    }); 
    after(() => {
      productModel.getById.restore();
    });
    it('Espera que o produto encontrado seja um array', async () => {
      const response = await productService.getById();
      expect(response).to.be.an('array');
      expect(response).to.be.not.empty;
    });
    it('Espera que o produto tenha as chaves "id", "name", "quantity"', async () => {
      const response = await productService.getById();
      expect(response).to.be.deep.equal(productId);
      expect(response[0]).to.include.all.keys('id','name','quantity');
    });

  });
  
  describe('Quando o id inserido não retorna um produto', () => {
    before( async () => {
      const resultProducts = [];
      sinon.stub(productModel, 'getById').resolves(resultProducts);
    }); 
    after(() => {
      productModel.getById.restore();
    });

    it('Espera o retorno ser um array', async () => {
      const response = await productService.getById();
      expect(response).to.be.an('array');
    });
    it('Espera que o array esteja vazio', async () => {
      const response = await productService.getById();
      expect(response).to.be.empty;
    });

  });
});