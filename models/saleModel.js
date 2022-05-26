const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.sales';
  const [results] = await connection.execute(query);
  return results;
};

const saleModel = { getAll };

module.exports = saleModel;