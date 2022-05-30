const serialize = (dataArray) => dataArray.map((data) => ({ saleId: data.sale_id,
  date: data.date,
  productId: data.product_id,
  quantity: data.quantity }));

const serializeId = (dataArray) => dataArray.map((data) => ({
  date: data.date,
  productId: data.product_id,
  quantity: data.quantity }));

  module.exports = { serialize, serializeId };