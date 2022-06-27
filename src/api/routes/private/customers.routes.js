const express = require("express");
const _customers = require("../../controllers/customers.controllers.js");
const validation = require("../../../middleware/security/validator.js");
const __customers = require("../../../@schemas/customers.js");

const router = express.Router();

router.post("/customers/new", validation(__customers.create), _customers.new);
router.get("/customers", validation(__customers.all), _customers.all);
router.get("/customers/:id", validation(__customers.one), _customers.one);

module.exports = router;
