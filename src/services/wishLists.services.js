const _utils = require("../@functions/utils.func.js");
const _string = require("../@functions/string.func.js");
const _pagination = require("../@functions/pagination.func.js");
const { v4: uuidv4 } = require("uuid");

const addToWishList = ({ db, body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { productId, wishListGroupId } = body;
      const product = await db.product.findByPk(productId);

      const wishListGroup = await db.wishListGroup.findByPk(wishListGroupId);
      await wishListGroup.addProduct(product);

      const newLine = await db.wishList.findOne({
        where: {
          productId,
          wishListGroupId,
        },
      });
      resolve(newLine);
    } catch (error) {
      const err = _utils.getErrors(error);
      reject({
        statusCode: err.statusCode,
        data: err.data,
      });
    }
  });

const deleteItem = (id, options) =>
  new Promise(async (resolve, reject) => {
    try {
      const { db } = options;
      await db.wishList.destroy({
        where: {
          id,
        },
      });

      resolve();
    } catch (error) {
      const err = _utils.getErrors(error);
      reject({
        statusCode: err.statusCode,
        data: err.data,
      });
    }
  });

module.exports = {
  addToWishList,
  deleteItem,
};
