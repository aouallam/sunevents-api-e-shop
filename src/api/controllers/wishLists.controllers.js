const { getErrors } = require("../../@functions/utils.func.js");
const _wishList = require("../../services/wishLists.services.js");

exports.add = async (req, res) => {
  try {
    const { mainDB, body, customer } = req;
    body.customerId = customer.id;
    const wishList = await _wishList.addToWishList({
      db: mainDB,
      body,
    });
    res.send(wishList);
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

exports.deleteItem = async (req, res) => {
  try {
    const { mainDB } = req;
    const { id } = req.params;

    const shop = await _wishList.deleteItem(id, {
      db: mainDB,
    });
    res.send(shop);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
