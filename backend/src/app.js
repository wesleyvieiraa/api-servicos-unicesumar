require("dotenv").config({
  path: ".env",
});

const express = require("express");
const compression = require("compression");
const cors = require("cors");
const swaggerFile = require('../swagger')
const swaggerUI = require("swagger-ui-express");
const swaggerJSDOC = require("swagger-jsdoc");

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(compression());
    this.express.use(cors());
    this.express.use(express.json());
    const specs = swaggerJSDOC(swaggerFile);
    this.express.use('/doc', swaggerUI.serve, swaggerUI.setup(specs));
  }

  routes() {
    this.express.use("/api/v1", require("./routes/index-routes"));
    this.express.use("/api/v1", require("./routes/login-routes"));
  }
}

module.exports = new AppController().express;
