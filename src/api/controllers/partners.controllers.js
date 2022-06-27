const { getErrors } = require("../../@functions/utils.func.js");
const _partner = require("../../services/partners.services.js");

exports.new = async (req, res) => {
  try {
    const { mainDB, body } = req;
    const partner = await _partner.create({
      db: mainDB,
      body,
      validate: true,
    });
    res.send(partner);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
exports.all = async (req, res) => {
  try {
    const { mainDB } = req;
    const partners = await _partner.findAll({
      db: mainDB,
    });
    res.send(partners);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
exports.one = async (req, res) => {
  try {
    const { mainDB } = req;
    const { id } = req.params;
    const partner = await _partner.findOne(id, {
      db: mainDB,
    });
    res.send(partner);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
