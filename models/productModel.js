const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [result] = await connection.execute(query, [id]);
  return result;
};

const addProduct = async (name, quantity) => {
  const query = `INSERT INTO StoreManager.products (name, quantity)
  VALUES (?, ?)`;
  const [{ insertId }] = await connection.execute(query, [name, quantity]);
  return insertId;
};

const getByName = async (name) => {
  const query = 'Select * FROM StoreManager.products WHERE name = ? ';
  const [result] = await connection.execute(query, [name]);
  // console.log('getByName no model', result);
  return result[0];
};

const productModel = { getAll, getById, addProduct, getByName };

module.exports = productModel;