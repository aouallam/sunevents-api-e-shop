const { getErrors } = require("../../@functions/utils.func.js");
const _product = require("../../services/products.services.js");

exports.new = async (req, res) => {
  try {
    const { mainDB, body } = req;
    const product = await _product.create({
      db: mainDB,
      body,
      validate: true,
    });
    res.send(product);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
exports.all = async (req, res) => {
  try {
    const { mainDB } = req;
    const products = await _product.findAll({
      db: mainDB,
    });
    res.send(products);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
exports.one = async (req, res) => {
  try {
    const { mainDB } = req;
    const { id } = req.params;
    const product = await _product.findOne(id, {
      db: mainDB,
    });
    res.send(product);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
