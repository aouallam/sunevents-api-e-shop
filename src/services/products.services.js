const _utils = require("../@functions/utils.func.js");
const _string = require("../@functions/string.func.js");
const _pagination = require("../@functions/pagination.func.js");
const { v4: uuidv4 } = require("uuid");

const create = ({ db, body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { modelId, name, categories = [], attributes = [] } = body;
      const object = {
        modelId: modelId || uuidv4(),
        slug: _string.slug(name),
      };
      const product = await db.product.create({
        ...body,
        ...object,
      });
      const findCats = await db.category.findAll({ where: { id: categories } });
      await product.addCategories(findCats);
      const createAttributes = await db.attribute.bulkCreate(attributes, {
        returning: true,
      });
      await product.addAttributes(createAttributes);
      resolve(product);
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
      const product = await db.product.findByPk(id, {
        where: objWhere,
        include: arrayInclude.concat(include),
      });
      if (!product && validate) {
        return reject({
          statusCode: 404,
          data: {
            message: "Product not found",
            code: "product_not_found",
          },
        });
      }
      resolve(product);
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
          table: "product",
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
