const sinon = require('sinon');
const { expect } = require('chai');

const saleController = require('../../../controllers/saleController');
const saleService = require('../../../services/saleService');

describe('Ao chamar o controller de getSales, rota "get" ', () => {
  describe('Quando a venda é retornada com sucesso', () => {
    const request = {};
    const response = {};
    const payloadSales = [
      {
        saleId: 1,
        date: "2022-06-01T17:30:13.000Z",
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: "2022-06-01T17:30:13.000Z",
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: "2022-06-01T17:30:13.000Z",
        productId: 3,
        quantity: 15,
      },
    ];
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(payloadSales);
      sinon.stub(saleService, 'getAll').resolves(payloadSales);
    });
    after(() => {
      saleService.getAll.restore();
    });
    it('Metódo status retorna o codigo 200', async () =>{
      await saleController.getSales(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
    it('Metódo json retorna passando um array', async () =>{
      await saleController.getSales(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.true;
    });
    it('Metódo json retorna o array com as vendas', async () =>{
      await saleController.getSales(request, response);
      expect(response.json.calledWith(payloadSales)).to.be.true;
    });
  });
});

describe('Ao chamar o contoller pelo getSalesById', () => {
  describe('Quando não existe a venda cadastrada', () => {
    const request = { params: { id: 10} };
    const response = {};

    const messageJson = { message: 'Sale not found'};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(messageJson);

      sinon.stub(saleService, 'getById').resolves([]);
    });
    after(() => {
      saleService.getById.restore();
    });
    it('Retorna um objeto com os métodos "status" e "json" ao receber um array vazio', async () => {
      await saleController.getSalesById(request, response);
      expect(response.status.calledWith(404)).to.be.true;
      expect(response.json.calledWith(messageJson)).to.be.true;
    });
  });

});