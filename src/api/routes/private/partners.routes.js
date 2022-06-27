const express = require("express");
const _partners = require("../../controllers/partners.controllers.js");
const validation = require("../../../middleware/security/validator.js");
const __partners = require("../../../@schemas/partners.js");

const router = express.Router();

router.post("/partners/new", validation(__partners.create), _partners.new);
router.get("/partners", validation(__partners.all), _partners.all);
router.get("/partners/:id", validation(__partners.one), _partners.one);

module.exports = router;
