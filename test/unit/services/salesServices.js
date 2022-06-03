const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const saleModel = require('../../../models/saleModel');
const saleService = require('../../../services/saleService');

describe('Busca todos as vendas no Banco de Dados', () => {
  describe('Quando todas as vendas são encontradas', () => {
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
    before( async () => {
      sinon.stub(saleModel, 'getAll').resolves(payloadSales);
    });
    after(() => { saleModel.getAll.restore(); })
    it('Espera ser um array', async () => {
      const response = await saleService.getAll();
      expect(response).to.be.an('array');
    });
    it('Todos os produtos são encontrados', async() => {
      const response = await saleService.getAll();
      expect(response).to.be.deep.equal(payloadSales);
    });
    it('Todas as sales são encontrados e possuem as chaves desejadas "saleId", "date","productId", "quantity"', async() => {
      const response = await saleService.getAll();
      response.forEach((item) => {
        expect(item).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });
    });
  });
  
  describe('Quando as sales não são encontrado', () => {
    before( async () => {
      const resultSales = [];
      sinon.stub(saleModel, 'getAll').resolves(resultSales);
    }); 
    after(() => {
      saleModel.getAll.restore();
    });
  
    it('Espera o retorno ser um array', async () => {
      const response = await saleService.getAll();
      expect(response).to.be.an('array');
    });
    it('Espera que o array esteja vazio', async () => {
      const response = await saleService.getAll();
      expect(response).to.be.empty;
    });
  
  });
  });
  
  describe('Busca um Sale por ID', () => {
    describe('Quando uma sale é encontrada', () => {
      const salesId = [
        {
          date: "2022-06-02T19:21:14.000Z",
          productId: 2,
          quantity: 10,
        }
      ];
      before( async () => {
        sinon.stub(saleModel, 'getById').resolves(salesId);
      });
      after( () => { saleModel.getById.restore(); })
      it('Espera que seja um array', async () => {
        const response = await saleService.getById();
        expect(response).to.be.an('array');
      });
      it('Espera que seja um array que contem um objecto com as chaves "date", "quantity", "productId" ', async () => {
        const response = await saleService.getById();
        expect(response[0]).to.be.an('object');
        expect(response[0]).to.include.all.keys('date', 'quantity', 'productId')
      });
    });
    describe('Quando uma sale  não é encontrada', () => {
      before( async () => {
        sinon.stub(saleModel, 'getById').resolves([]);
      });
      after( () => { saleModel.getById.restore(); })
      it('Espera que seja um array', async () => {
        const response = await saleService.getById();
        expect(response).to.be.an('array');
      });
      it('Espera que seja um array vazio', async () => {
        const response = await saleService.getById();
        expect(response).to.be.empty;
        
      });
    });
  });