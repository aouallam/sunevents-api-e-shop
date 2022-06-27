const _utils = require("../@functions/utils.func.js");
const _pagination = require("../@functions/pagination.func.js");

const create = ({ db, body, validate }) =>
  new Promise(async (resolve, reject) => {
    try {
      const object = {};
      const [customer, created] = await db.customer.findOrCreate({
        where: { email: body.email },
        defaults: { ...body, ...object },
      });
      if (!created && validate) {
        return reject({
          statusCode: 409,
          data: {
            message: "Customer already exists",
            code: "customer_exist",
          },
        });
      }
      resolve(customer);
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
      const customer = await db.customer.findByPk(id, {
        where: objWhere,
        include: arrayInclude.concat(include),
      });
      console.log(customer);
      if (!customer && validate) {
        return reject({
          statusCode: 404,
          data: {
            message: "Customer not found",
            code: "customer_not_found",
          },
        });
      }
      resolve(customer);
    } catch (error) {
      const err = _utils.getErrors(error);
      reject({
        statusCode: err.statusCode,
        data: err.data,
      });
    }
  });

const findAll = (options) =>
  new Promise(async (resolve, reject) => {
    try {
      const { db, query = {}, where = {}, include = [] } = options;
      const { page, size } = query;
      const arrayInclude = [];
      const objWhere = {};
      Object.assign(objWhere, where);
      const response = await _pagination.format(
        {
          db,
          page,
          size,
          table: "customer",
        },
        {
          where: objWhere,
          include: arrayInclude.concat(include),
        }
      );
      resolve(response);
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
  create,
  findOne,
  findAll,
};
