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
