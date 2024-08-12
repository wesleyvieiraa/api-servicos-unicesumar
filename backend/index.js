const app = require('./src');
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Aplicação executando na porta: ', port);
});
