// const app = require('./src/app');
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log('Aplicação executando na porta: ', port);
// });


require("dotenv").config();

const express = require("express");
const PORT = 3000;
const app = express();
app.use(express.json());

app.get("/api/v1/teste", async (req, res) => {
  return res.status(200).send("Teste OK");
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})