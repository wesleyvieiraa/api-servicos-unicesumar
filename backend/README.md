
# 🚀 Back da Aplicação ServiceHub

Bem-vindo ao backend da nossa aplicação! Este projeto foi desenvolvido utilizando **Node.js** e segue um padrão arquitetural baseado em uma variação de **MVC**.


## 🛠️ Tecnologias utilizadas

**[Node.js]([https://nodejs.org/download/release/v20.15.0/](https://nodejs.org/docs/latest/api/)):** v20.15.0<br>
**[Express](https://expressjs.com/pt-br/)**<br>
**[Compression](https://www.npmjs.com/package/compression)**<br>
**[Cors](https://www.npmjs.com/package/cors)**<br>
**[Dotenv](https://www.npmjs.com/package/dotenv)**<br>
**[Swagger](https://swagger.io/docs/)**<br>
**[Winston](https://github.com/winstonjs/winston/tree/2.x)**<br>
**[Postgres](https://www.postgresql.org/docs/)**


## 🚧 Estrutura do Projeto

Este projeto utiliza uma variação do padrão MVC:

- **Routes:** Responsável por definir cada rota.
- **Controller:** Responsável por definir as regras de negócio e configurações.
- **Repository:** Responsável pelas **transações com o banco de dados**.
- **Model:** Local onde definimos os **DTOs (Data Transfer Objects)**, padronizando a estrutura dos objetos da aplicação.

A estrutura das pastas é a seguinte:

```plaintext
📂 src
├── 📂 controllers
├── 📂 models
├── 📂 repositories
├── 📂 routes
```


## ⚙️ Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto e configure-o de acordo com o arquivo `.env.example` fornecido. Este arquivo deve conter as configurações necessárias para conectar ao banco de dados e outras variáveis de ambiente.


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/wesleyvieiraa/api-servicos-unicesumar.git
```

Entre no diretório do projeto

```bash
  cd api-servicoes-unicesumar/back
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## 📚 Documentação

A documentação do swagger pode ser acessada através da rota `dev`


## 📬 Contato

Em caso de dúvidas ou sugestões, entre em contato através do email: w.g20@hotmail.com
## Autores

- [@wesleyvieiraa](https://github.com/wesleyvieiraa)

