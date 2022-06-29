const express = require("express");
const _wishListGroups = require("../../controllers/wishListGroups.controllers.js");
const validation = require("../../../middleware/security/validator.js");
const __wishListGroups = require("../../../@schemas/wishListGroups.js");
const authCustomer = require("../../../middleware/security/customerAuth");
const router = express.Router();

router.post(
  "/wishListGroups/add",
  validation(__wishListGroups.add),
  authCustomer.isAuth,
  _wishListGroups.add
);

router.get(
  "/wishListGroups/findOne/:id",
  validation(__wishListGroups.findOne),
  authCustomer.isAuth,
  _wishListGroups.findOne
);

module.exports = router;
