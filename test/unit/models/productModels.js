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

describe('Busca um determinado produto por Id', () => {
  describe('Quando o produto é encontrado atraves do id inserido', () => {
    const productOne = [[{
        id: 1,
        name: "Martelo de Thor",
        quantity: 10,
      }]];
    before( async ()=> {
      sinon.stub(connection, 'execute').resolves(productOne);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Espera que seja um array não vazio  ', async () => {
      const response = await productModel.getById();
      expect(response).to.be.a('array');
      expect(response).to.be.deep.equal(productOne[0]);
    });
    it('Espera que seja um objeto com id, name, quantity ', async () => {
      const response = await productModel.getById();
      expect(response[0]).to.include.all.keys('id','name','quantity');
    });
  });
  describe('Quando o produto não é encontrado atraves do id inserido', () => {
    const productOne = [[]];
    before( async ()=> {
      sinon.stub(connection, 'execute').resolves(productOne);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Espera que seja um array vazio  ', async () => {
      const response = await productModel.getById();
      expect(response).to.be.a('array');
      expect(response).to.be.empty;
    });
  });
});

describe('Adiciona um produto ao BD', () => {
  describe('Quando o produto é adicionado com sucesso', () => {
    const idinsert = [{ insertId: 1 }];
    before( async () => {
      sinon.stub(connection, 'execute').resolves(idinsert);
    });
    after( () => { connection.execute.restore(); });
    it('Quando o produto é adicionado com sucesso', async () => {
      const response = await productModel.addProduct();
      console.log('response', response);
      expect(response).to.be.an('number');
    });
  });
});

describe('Busca um produto pelo nome no BD', () => {
  describe('Quando o produto buscado pelo nome é encontrado', () => {
    const nameSearch = [[{ name: 'Martelo de Thor'}]];
    before(async () => {
      sinon.stub(connection, 'execute').resolves(nameSearch);
    });
    after(() => { connection.execute.restore(); })
    it('Espera que o retorno seja um objeto', async () => {
      const response = await productModel.getByName();
      expect(response).to.be.an('object');
    });
    it('Espera que o retorno seja o item esperado', async () => {
      const response = await productModel.getByName();
      expect(response).to.be.deep.equal(nameSearch[0][0]);
    });
  });
  describe('Quando o produto buscado pelo nome não é encontrado', () => {
    const noNameSearch = [[[]],''];
    before(async () => {
      sinon.stub(connection, 'execute').resolves(noNameSearch);
    });
    after(() => { connection.execute.restore(); })
    it('Espera que o retorno seja um array', async () => {
      const response = await productModel.getByName();
      expect(response).to.be.an('array');
    });
    it('Espera que o retorno seja um array vazio', async () => {
      const response = await productModel.getByName();
      expect(response).to.be.empty;
    });
  });
});

describe('Edita um produto no banco de Dados', () => {
  describe('Produto Editado com Sucesso', () => {
    const resultEdit = [{ affectedRows: 1 }];
    before( async () => {
      sinon.stub(connection, 'execute').resolves(resultEdit);
    });
    after( () => { connection.execute.restore(); });
    it('Espera que o retorno seja um objeto', async () => {
      const response = await productModel.editProduct();
      expect(response).to.be.an('object');
    });
    it('Espera que o retorno seja um objeto com a chhave affect Rows', async () => {
      const response = await productModel.editProduct();
      expect(response).to.have.key('affectedRows');
      expect(response.affectedRows).to.be.equal(1);
    });
  });
  describe('Quando o Produto não é Editado com Sucesso', () => {
    const resultEdit = [{ affectedRows: 0 }];
    before( async () => {
      sinon.stub(connection, 'execute').resolves(resultEdit);
    });
    after( () => { connection.execute.restore(); });
    it('Espera que o retorno seja um objeto', async () => {
      const response = await productModel.editProduct();
      expect(response).to.be.an('object');
    });
    it('Espera que o retorno seja um objeto com a chave affectRows', async () => {
      const response = await productModel.editProduct();
      expect(response).to.have.key('affectedRows');
      expect(response.affectedRows).to.be.equal(0);
    });
  });
});

describe('Deleta um produto do banco de Dados', () => {
  describe('Produto deletado com Sucesso', () => {
    const resultDelete = [{ affectedRows: 1 }];
    before( async () => {
      sinon.stub(connection, 'execute').resolves(resultDelete);
    });
    after( () => { connection.execute.restore(); });
    it('Espera que o retorno seja um objeto', async () => {
      const response = await productModel.deleteProduct();
      expect(response).to.be.an('object');
    });
    it('Espera que o retorno seja um objeto com a chave affectRows', async () => {
      const response = await productModel.deleteProduct();
      expect(response).to.have.key('affectedRows');
      expect(response.affectedRows).to.be.equal(1);
    });
  });
  describe('Quando o Produto não é deletado com Sucesso', () => {
    const resultDelete = [{ affectedRows: 0 }];
    before( async () => {
      sinon.stub(connection, 'execute').resolves(resultDelete);
    });
    after( () => { connection.execute.restore(); });
    it('Espera que o retorno seja um objeto', async () => {
      const response = await productModel.deleteProduct();
      expect(response).to.be.an('object');
    });
    it('Espera que o retorno seja um objeto com a chhave affect Rows', async () => {
      const response = await productModel.deleteProduct();
      expect(response).to.have.key('affectedRows');
      expect(response.affectedRows).to.be.equal(0);
    });
  });
});