const express = require("express");
const _shoppingCarts = require("../../controllers/shoppingCarts.controllers.js");
const validation = require("../../../middleware/security/validator.js");
const __shoppingCarts = require("../../../@schemas/shoppingCarts.js");
const authCustomer = require("../../../middleware/security/customerAuth");
const router = express.Router();

router.post(
  "/shoppingCarts/add",
  validation(__shoppingCarts.add),
  authCustomer.isAuth,
  _shoppingCarts.add
);

router.post(
  "/shoppingCarts/set",
  validation(__shoppingCarts.set),
  authCustomer.isAuth,
  _shoppingCarts.setQuantity
);

router.get(
  "/shoppingCarts/find",
  validation(__shoppingCarts.findCart),
  authCustomer.isAuth,
  _shoppingCarts.findCart
);

router.delete(
  "/shoppingCarts/delete/:id",
  validation(__shoppingCarts.suppItem),
  authCustomer.isAuth,
  _shoppingCarts.suppItem
);

module.exports = router;
