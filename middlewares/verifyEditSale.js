const verifyEditSale = (req, res, next) => {
  const arrayEditSales = req.body;
  arrayEditSales.forEach(({ quantity }) => {
    if (quantity <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  });
  next();
};

module.exports = verifyEditSale;