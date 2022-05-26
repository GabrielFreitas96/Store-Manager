const app = require('./app');
require('dotenv').config();
const routerProduct = require('./routers/routerProduct');
const routerSale = require('./routers/routerSale');
// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto
app.get('/lalalala', (req, res) => {
  console.log('rodando lalalala');
  res.status(200).json({ message: 'está rodando' });
});

app.use('/products', routerProduct);
app.use('/sales', routerSale);
app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});