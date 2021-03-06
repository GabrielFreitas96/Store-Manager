const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);
  // console.log(result);
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
  return result[0];
};

const editProduct = async (id, name, quantity) => {
  const query = 'UPDATE StoreManager.products set name = ?,quantity = ? WHERE id = ?';
  const [result] = await connection.execute(query, [name, quantity, id]);
  return result;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id=?';
  const [result] = await connection.execute(query, [id]);
  return result;
};
// const getProductsQuantitys = async (arrayProducts) => {
//   const query = 'SELECT quantity FROM StoreManager.products WHERE id=?';
//   const arrayQuantitys = [];
//   arrayProducts.forEach(async ({ productId }) => {
//     const [[{ quantity }]] = await connection.execute(query, [productId]);
//     console.log('no forEach', quantity);
//     arrayQuantitys.push(quantity);
//   });
//   console.log('quantitys de products', arrayQuantitys);
//   return arrayQuantitys;
// };

const productModel = { getAll,
  getById,
  addProduct,
  getByName,
  editProduct,
  deleteProduct,
 };

module.exports = productModel;