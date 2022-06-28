const _utils = require("../@functions/utils.func.js");
const _string = require("../@functions/string.func.js");
const _pagination = require("../@functions/pagination.func.js");
const { v4: uuidv4 } = require("uuid");

const addToCart = ({ db, body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { productId, quantity, customerId } = body;
      const product = await db.product.findByPk(productId);
      const shoppingCart = await db.shoppingCart.findOne({
        where: {
          productId,
          customerId,
        },
      });
      const stock = product.stock - (shoppingCart?.quantity || 0);
      if (stock < quantity) {
        return reject({
          statusCode: 400,
          data: {
            message: "Not enough stock",
            code: "not_enough_stock",
          },
        });
      }
      if (shoppingCart) {
        await shoppingCart.increment("quantity", { by: quantity });
      } else {
        const customer = await db.customer.findByPk(customerId);
        await customer.addProduct(product, {
          through: { quantity },
        });
      }
      const newLine = await db.shoppingCart.findOne({
        where: {
          productId,
          customerId,
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

const setQuantity = ({ db, body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { itemId, quantity } = body;
      const item = await db.shoppingCart.findByPk(itemId);
      const product = await db.product.findByPk(item.productId);
      const stock = product.stock;
      if (stock < quantity) {
        return reject({
          statusCode: 400,
          data: {
            message: "Not enough stock",
            code: "not_enough_stock",
          },
        });
      }

      await item.set({
        quantity,
      });
      await item.save();
      const newLine = await db.shoppingCart.findByPk(itemId);
      resolve(newLine);
    } catch (error) {
      const err = _utils.getErrors(error);
      reject({
        statusCode: err.statusCode,
        data: err.data,
      });
    }
  });

const findCart = (id, options) =>
  new Promise(async (resolve, reject) => {
    try {
      const { db } = options;
      const customer = await db.customer.findByPk(id, {
        include: [{ model: db.product, attributes: ["name", "priceU", "tax"] }],
      });
      const items = customer?.products || [];
      const total = items.reduce((prev, cur) => {
        return prev + cur.priceU * cur.shoppingCart.quantity;
      }, 0);
      resolve({
        total,
        items,
      });
    } catch (error) {
      const err = _utils.getErrors(error);
      reject({
        statusCode: err.statusCode,
        data: err.data,
      });
    }
  });

  
const update = () => new Promise(async (resolve, reject) => {});

module.exports = {
  addToCart,
  setQuantity,
  findCart,
};
