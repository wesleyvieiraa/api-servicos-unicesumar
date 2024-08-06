const router = require("express").Router();
const indexController = require("../controller/index-controller");
const pool = require("../database/pool");

/* GET */
router.get("/info", indexController.info);

module.exports = router;