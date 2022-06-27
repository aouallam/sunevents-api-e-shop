const express = require("express");
const _products = require("../../controllers/products.controllers.js");
const validation = require("../../../middleware/security/validator.js");
const __products = require("../../../@schemas/products.js");

const router = express.Router();

router.post("/products/new", validation(__products.create), _products.new);
router.get("/products", validation(__products.all), _products.all);
router.get("/products/:id", validation(__products.one), _products.one);

module.exports = router;
