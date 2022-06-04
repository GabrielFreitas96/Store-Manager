const verifySale = (req, res, next) => {
  // console.log('body', req.body);
  const array = req.body;
  // console.log('tamanho do array', array.length);
  // const [{ productId, quantity }] = req.body;
  // console.log('No middleware de Sale productId', productId);
  // console.log('No middleware de Sale quantity', quantity);

  array.forEach(({ productId, quantity }) => {
    console.log(productId, quantity);
    if (!productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    if (!quantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    if (quantity <= 0) {
      return res.status(422).json({ message: ' "quantity" must be greater than or equal to 1' });
    } 
  });

  next();
};

module.exports = { verifySale };