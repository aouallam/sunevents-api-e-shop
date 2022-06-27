const express = require("express");
const _categories = require("../../controllers/categories.controllers.js");
const validation = require("../../../middleware/security/validator.js");
const __categories = require("../../../@schemas/categories.js");

const router = express.Router();

router.post(
  "/categories/new",
  validation(__categories.create),
  _categories.new
);
router.get("/categories", validation(__categories.all), _categories.all);
router.get("/categories/:id", validation(__categories.one), _categories.one);

module.exports = router;
