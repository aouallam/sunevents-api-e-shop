const { getErrors } = require("../../@functions/utils.func.js");
const _shoppingCart = require("../../services/shoppingCarts.services.js");

exports.add = async (req, res) => {
  try {
    const { mainDB, body, customer } = req;
    body.customerId = customer.id;
    const shoppingCart = await _shoppingCart.addToCart({
      db: mainDB,
      body,
    });
    res.send(shoppingCart);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};

exports.setQuantity = async (req, res) => {
  try {
    const { mainDB, body } = req;
    const shoppingCart = await _shoppingCart.setQuantity({
      db: mainDB,
      body,
    });
    res.send(shoppingCart);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};

exports.findCart = async (req, res) => {
  try {
    const { mainDB, customer } = req;
    const shoppingCart = await _shoppingCart.findCart(customer.id, {
      db: mainDB,
    });
    res.send(shoppingCart);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
