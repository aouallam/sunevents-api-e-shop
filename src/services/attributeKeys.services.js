const _utils = require("../@functions/utils.func.js");
const _string = require("../@functions/string.func.js");
const _pagination = require("../@functions/pagination.func.js");

const create = ({ db, body, validate }) =>
  new Promise(async (resolve, reject) => {
    try {
      const object = {};
      const [attributeKey, created] = await db.attributeKey.findOrCreate({
        where: { key: body.key, partnerId: body.partnerId },
        defaults: { ...body, ...object },
      });
      if (!created && validate) {
        return reject({
          statusCode: 409,
          data: {
            message: "attributeKey already exist",
            code: "attributeKey_exist",
          },
        });
      }
      resolve(attributeKey);
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
      const attributeKey = await db.attributeKey.findByPk(id, {
        where: objWhere,
        include: arrayInclude.concat(include),
      });
      if (!attributeKey && validate) {
        return reject({
          statusCode: 404,
          data: {
            message: "attributeKey not found",
            code: "attributeKey_not_found",
          },
        });
      }
      resolve(attributeKey);
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
          table: "attributeKey",
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
