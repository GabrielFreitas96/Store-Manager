const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.sales';
  const [results] = await connection.execute(query);
  console.log('Sales no model', results);
  return results;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.sales WHERE id = ?';
  const [result] = await connection.execute(query, [id]);
  return result;
};

const saleModel = { getAll, getById };

module.exports = saleModel;