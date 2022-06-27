const { getErrors } = require("../../@functions/utils.func.js");
const _customer = require("../../services/customers.services.js");

exports.new = async (req, res) => {
  try {
    const { mainDB, body } = req;
    const customer = await _customer.create({
      db: mainDB,
      body,
      validate: true,
    });
    res.send(customer);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
exports.all = async (req, res) => {
  try {
    const { mainDB } = req;
    const customers = await _customer.findAll({
      db: mainDB,
    });
    res.send(customers);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
exports.one = async (req, res) => {
  try {
    const { mainDB } = req;
    const { id } = req.params;
    const customer = await _customer.findOne(id, {
      db: mainDB,
    });
    res.send(customer);
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
};
