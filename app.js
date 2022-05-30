const express = require('express');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// require('dotenv').config();
const routerProduct = require('./routers/routerProduct');
const routerSale = require('./routers/routerSale');

app.get('/lalalala', (req, res) => {
  console.log('rodando lalalala');
  res.status(200).json({ message: 'está rodando' });
});

app.use('/products', routerProduct);
app.use('/sales', routerSale);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
