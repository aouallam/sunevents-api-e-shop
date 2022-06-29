const express = require("express");
const _wishLists = require("../../controllers/wishLists.controllers.js");
const validation = require("../../../middleware/security/validator.js");
const __wishLists = require("../../../@schemas/wishLists.js");
const authCustomer = require("../../../middleware/security/customerAuth");
const router = express.Router();

router.post(
  "/wishLists/add",
  validation(__wishLists.add),
  authCustomer.isAuth,
  _wishLists.add
);

router.delete(
  "/wishLists/delete/:id",
  validation(__wishLists.deleteItem),
  authCustomer.isAuth,
  _wishLists.deleteItem
);

module.exports = router;
