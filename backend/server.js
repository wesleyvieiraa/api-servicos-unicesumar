// const app = require('./src/app');
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log('Aplicação executando na porta: ', port);
// });
const express = require('express');
const app = express();

app.get('/api/v1/teste', (req, res) => {
  res.send('Rota de teste funcionando!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Aplicação executando na porta: ', port);
});