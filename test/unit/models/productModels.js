const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productModel = require('../../../models/productModel');

describe('Busca todos os produtos no Banco de Dados getAll()', () => {
  describe('Quando todos os produtos são encontrados', () => {
    const payloadProducts = [[
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
    ]];
  before( async () => {
    sinon.stub(connection, 'execute').resolves(payloadProducts);
  });
  after(() => { connection.execute.restore(); })
  it('Espera ser um array', async() => {
    const response = await productModel.getAll();
    // console.log('response', response);
    expect(response).to.be.an('array');
    // expect(response).to.be.deep.equal(payloadProducts);
  });
  it('Todos os produtos são encontrados', async() => {
    const response = await productModel.getAll();
    expect(response).to.be.deep.equal(payloadProducts[0]);
  });
  it('Todos os produtos são encontrados e possuem as chaves desejadas "id", "name", "quantity"', async() => {
    const response = await productModel.getAll();
    response.forEach((item) => {
      expect(item).to.include.all.keys('id','name','quantity');
    });
  });

  });
  
  describe('Quando o produto não é encontrado', () => {
    before( async () => {
      const resultProducts = [[]];
      sinon.stub(connection, 'execute').resolves(resultProducts);
    }); 
    after(() => {
      connection.execute.restore();
    });

    it('Espera o retorno ser um array', async () => {
      const response = await productModel.getAll();
      expect(response).to.be.an('array');
    });
    it('Espera que o array esteja vazio', async () => {
      const response = await productModel.getAll();
      expect(response).to.be.empty;
    });

  });

});

