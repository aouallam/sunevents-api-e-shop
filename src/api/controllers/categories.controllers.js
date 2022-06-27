const { getErrors } = require("../../@functions/utils.func.js");
const _category = require("../../services/categories.services.js");

exports.new= async (req, res) => {
  try {
    const { mainDB, body } = req;
    const category = await _category.create({
      db: mainDB,
      body,
      validate: true,
    });
    res.send(category);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
exports.all = async (req, res) => {
  try {
    const { mainDB } = req;
    const categories = await _category.findAll({
      db: mainDB,
    });
    res.send(categories);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
exports.one = async (req, res) => {
  try {
    const { mainDB } = req;
    const { id } = req.params;
    const category = await _category.findOne(id, {
      db: mainDB,
    });
    res.send(category);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
