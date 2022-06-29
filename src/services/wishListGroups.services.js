const _utils = require("../@functions/utils.func.js");
const _pagination = require("../@functions/pagination.func.js");

const newWishListGroup = ({ db, body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { name } = body;

      const [wishListGroup, created] = await db.wishListGroup.findOrCreate({
        where: { name },
        defaults: { ...body },
      });
      if (!created) {
        return reject({
          statusCode: 409,
          data: {
            message: "This wish list group already exists",
            code: "wishListGroup_exist",
          },
        });
      }

      resolve(wishListGroup);
    } catch (error) {
      const err = _utils.getErrors(error);
      reject({
        statusCode: err.statusCode,
        data: err.data,
      });
    }
  });

const findOne = (id, options) =>
  new Promise(async (resolve, reject) => {
    try {
      const { db, where = {}, include = [], validate } = options;
      const arrayInclude = [];
      const objWhere = {};

      Object.assign(objWhere, where);
      const wishListGroup = await db.wishListGroup.findByPk(id, {
        where: objWhere,
        include: arrayInclude.concat(include),
      });
      if (!wishListGroup && validate) {
        return reject({
          statusCode: 404,
          data: {
            message: "Wish list not found",
            code: "WishList_not_found",
          },
        });
      }

      resolve({ wishListGroup });
    } catch (error) {
      const err = _utils.getErrors(error);
      reject({
        statusCode: err.statusCode,
        data: err.data,
      });
    }
  });
module.exports = {
  newWishListGroup,
  findOne,
};
