const { getErrors } = require("../../@functions/utils.func.js");
const _wishListGroup = require("../../services/wishListGroups.services.js");

exports.add = async (req, res) => {
  try {
    const { mainDB, body, customer } = req;
    body.customerId = customer.id;
    const wishListGroup = await _wishListGroup.newWishListGroup({
      db: mainDB,
      body,
    });
    res.send(wishListGroup);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};

exports.findOne = async (req, res) => {
  try {
    const { mainDB } = req;
    const { id } = req.params;
    const wishListgroup = await _wishListGroup.findOne(id, {
      db: mainDB,
    });
    res.send(wishListgroup);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};

exports.delWishListGroup = async (req, res) => {
  try {
    const { mainDB } = req;
    const { id } = req.params;

    const shop = await _wishListGroup.delWishListGroup(id, {
      db: mainDB,
    });
    res.send(shop);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
