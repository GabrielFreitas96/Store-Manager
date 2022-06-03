const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const saleModel = require('../../../models/saleModel');

describe('Busca todos as vendas no Banco de Dados', () => {
describe('Quando todas as vendas são encontradas', () => {
  const payloadSalesSerialize = [[
    {
      sale_id: 1,
      date: "2022-06-01T17:30:13.000Z",
      product_id: 1,
      quantity: 5,
    },
    {
      sale_id: 1,
      date: "2022-06-01T17:30:13.000Z",
      product_id: 2,
      quantity: 10,
    },
    {
      sale_id: 2,
      date: "2022-06-01T17:30:13.000Z",
      product_id: 3,
      quantity: 15,
    },
  ]];
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
    sinon.stub(connection, 'execute').resolves(payloadSalesSerialize);
  });
  after(() => { connection.execute.restore(); })
  it('Espera ser um array', async () => {
    const response = await saleModel.getAll();
    expect(response).to.be.an('array');
  });
  it('Todos os produtos são encontrados', async() => {
    const response = await saleModel.getAll();
    expect(response).to.be.deep.equal(payloadSales);
  });
  it('Todas as sales são encontrados e possuem as chaves desejadas "saleId", "date","productId", "quantity"', async() => {
    const response = await saleModel.getAll();
    response.forEach((item) => {
      expect(item).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});

describe('Quando as sales não são encontrado', () => {
  before( async () => {
    const resultSales = [[]];
    sinon.stub(connection, 'execute').resolves(resultSales);
  }); 
  after(() => {
    connection.execute.restore();
  });

  it('Espera o retorno ser um array', async () => {
    const response = await saleModel.getAll();
    expect(response).to.be.an('array');
  });
  it('Espera que o array esteja vazio', async () => {
    const response = await saleModel.getAll();
    expect(response).to.be.empty;
  });

});
});

describe('Busca as sales pelo Id', () => {
  describe('Quando uma determinada venda é encontrada pelo ID', () => {
    const salesId = [
      {
        date: "2022-06-02T19:21:14.000Z",
        productId: 1,
        quantity: 5,
      },
      {
        date: "2022-06-02T19:21:14.000Z",
        productId: 2,
        quantity: 10,
      }
    ];
    const salesIdSerialize = [[
      {
        date: "2022-06-02T19:21:14.000Z",
        product_id: 1,
        quantity: 5,
      },
      {
        date: "2022-06-02T19:21:14.000Z",
        product_id: 2,
        quantity: 10,
      }
    ]];
    before( async () => {
      sinon.stub(connection, 'execute').resolves(salesIdSerialize);
    });
    after(() => { connection.execute.restore(); })
    it('O retorno é um array', async () => {
      const response = await saleModel.getById();
      expect(response).to.be.an('array');
      expect(response).to.be.deep.equal(salesId);
    });
    it('O retorno é um array que contem as chaves "date", "quantity", "productId"', async () => {
      const response = await saleModel.getById();
      response.forEach((item) => {
        expect(item).to.include.all.keys('date', 'quantity', 'productId');
      });
    });

  });
  describe('Quando uma determinada venda não é encontrada pelo ID', () => {
    before( async () => {
      const resultSalesId = [[]];
      sinon.stub(connection, 'execute').resolves(resultSalesId);
    }); 
    after(() => {
      connection.execute.restore();
    });
  
    it('Espera o retorno ser um array', async () => {
      const response = await saleModel.getById();
      expect(response).to.be.an('array');
    });
    it('Espera que o array esteja vazio', async () => {
      const response = await saleModel.getById();
      expect(response).to.be.empty;
    });
  });
});

describe('Quando uma determinada sale é adicionada', () => {
  describe('Quando uma sale é adicionada com sucesso', () => {
    const arrayAdd = [
      {
        productId: 1,
        quantity: 3
      }
    ];
    const resultAdd = {id: 5, itemsSold: [...arrayAdd] };
    const mockExecute = [{ insertId: 5 }];
    before( async() => {
      sinon.stub(connection, 'execute').resolves(mockExecute);
    });
    after( () => { connection.execute.restore(); });
    it('Retorna um objecto', async () => {
      const response = await saleModel.addSale(arrayAdd);
      console.log('response', response);
      expect(response).to.be.an('object');
   });
   it('O objeto retornado contém o item esperado', async () => {
    const response = await saleModel.addSale(arrayAdd);
    expect(response).to.be.deep.equal(resultAdd);
 });
  });
  
});
describe('Quando uma determinada sale é editada', () => {
  describe('Quando uma sale é editada com sucesso', () => {
    const arrayEdit = [
      {
        productId: 1,
        quantity: 3
      }
    ];
    const idEdit = 5;
    const resultEdit = {saleId: idEdit, itemUpdated: [...arrayEdit] };
    const mockExecute = {};
    before( async() => {
      sinon.stub(connection, 'execute').resolves(mockExecute);
    });
    after( () => { connection.execute.restore(); });
    it('Retorna um objecto', async () => {
      const response = await saleModel.editSale(idEdit, arrayEdit);
      console.log('response', response);
      expect(response).to.be.an('object');
   });
   it('O objeto retornado contém o item editado esperado', async () => {
    const response = await saleModel.editSale(idEdit, arrayEdit);
    expect(response).to.be.deep.equal(resultEdit);
 });
  });
  
});