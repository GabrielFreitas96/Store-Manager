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
const addSale = async (arrayNewSales) => {
  const queryNewSale = `INSERT INTO StoreManager.sales (date)
    VALUES (NOW())`;
    const [{ insertId }] = await connection.execute(queryNewSale);
    console.log('insert id', insertId);
  arrayNewSales.forEach(async ({ productId, quantity }) => {
    const queryNewSaleProduct = `INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`;
    await connection.execute(queryNewSaleProduct, [insertId, productId, quantity]);
  });
  const objectSales = { id: insertId, itemsSold: [...arrayNewSales] };
  return objectSales;
};

const editSale = async (id, arrayNewSales) => {
  arrayNewSales.forEach(async ({ productId, quantity }) => {
    const queryEditSale = `UPDATE StoreManager.sales_products 
  set quantity = ? WHERE sale_id = ? AND product_id = ?`;
    await connection.execute(queryEditSale, [quantity, id, productId]);
  });
  const salesUpdated = { saleId: id, itemUpdated: [...arrayNewSales] };
  return salesUpdated; 
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id=?';
  const [result] = await connection.execute(query, [id]);
  console.log('result no delete sales', result);
  return result;
};

const saleModel = { getAll, getById, addSale, editSale, deleteSale };

module.exports = saleModel;