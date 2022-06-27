const { getErrors } = require("../../@functions/utils.func.js");
const _attributeKey = require("../../services/attributeKeys.services.js");

exports.new = async (req, res) => {
  try {
    const { mainDB, body } = req;
    const attributeKey = await _attributeKey.create({
      db: mainDB,
      body,
      validate: true,
    });
    res.send(attributeKey);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
exports.all = async (req, res) => {
  try {
    const { mainDB } = req;
    const attributeKeys = await _attributeKey.findAll({
      db: mainDB,
    });
    res.send(attributeKeys);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
exports.one = async (req, res) => {
  try {
    const { mainDB } = req;
    const { id } = req.params;
    const attributeKey = await _attributeKey.findOne(id, {
      db: mainDB,
    });
    res.send(attributeKey);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
