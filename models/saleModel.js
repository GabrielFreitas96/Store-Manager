const connection = require('./connection');
const { serialize, serializeId } = require('../helpers/serialize');

const getAll = async () => {
  const query = `SELECT sales_products.sale_id, sales.date, 
  sales_products.product_id, sales_products.quantity 
  FROM StoreManager.sales INNER JOIN StoreManager.sales_products
  ON StoreManager.sales.id = StoreManager.sales_products.sale_id`;

  const [results] = await connection.execute(query);
  console.log('Sales no model', results);
  return serialize(results);
};

const getById = async (id) => {
  const query = `SELECT sales_products.sale_id, sales.date, 
  sales_products.product_id, sales_products.quantity 
  FROM StoreManager.sales INNER JOIN StoreManager.sales_products
  ON StoreManager.sales.id = StoreManager.sales_products.sale_id 
  WHERE id = ?`;
  const [result] = await connection.execute(query, [id]);
  return serializeId(result);
};

const saleModel = { getAll, getById };

module.exports = saleModel;