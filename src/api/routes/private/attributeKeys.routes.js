const express = require("express");
const _attributeKeys = require("../../controllers/attributeKeys.controllers.js");
const validation = require("../../../middleware/security/validator.js");
const __attributeKeys = require("../../../@schemas/attributeKeys.js");

const router = express.Router();

router.post(
  "/attributeKeys/new",
  validation(__attributeKeys.create),
  _attributeKeys.new
);
router.get(
  "/attributeKeys",
  validation(__attributeKeys.all),
  _attributeKeys.all
);
router.get(
  "/attributeKeys/:id",
  validation(__attributeKeys.one),
  _attributeKeys.one
);

module.exports = router;
