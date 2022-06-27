const _utils = require("../@functions/utils.func.js");
const _string = require("../@functions/string.func.js");
const _pagination = require("../@functions/pagination.func.js");

const create = ({ db, body, validate }) =>
  new Promise(async (resolve, reject) => {
    try {
      const object = {
        slug: _string.slug(body.name),
      };
      const [category, created] = await db.category.findOrCreate({
        where: { name: body.name },
        defaults: { ...body, ...object },
      });
      if (!created && validate) {
        return reject({
          statusCode: 409,
          data: {
            message: "Category already exist",
            code: "category_exist",
          },
        });
      }
      resolve(category);
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
      const category = await db.category.findByPk(id, {
        where: objWhere,
        include: arrayInclude.concat(include),
      });
      if (!category && validate) {
        return reject({
          statusCode: 404,
          data: {
            message: "Category not found",
            code: "category_not_found",
          },
        });
      }
      resolve(category);
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
          table: "category",
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
