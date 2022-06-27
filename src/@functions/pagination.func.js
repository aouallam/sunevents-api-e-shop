const _utils = require("./utils.func.js");

const getPagination = (page, size) => {
  const limit = size ? +size : undefined;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: total, rows: items } = data;
  const ids = items.map((item) => item.id);
  const current = page ? +page : 0;
  const pages = Math.ceil(total / limit) || 1;
  return { total, pages, current, items, ids };
};

const format = ({ db, page, size, table }, options) =>
  new Promise(async (resolve, reject) => {
    try {
      const { limit, offset } = getPagination(page, size);

      const result = await db[table].findAndCountAll({
        limit,
        offset,
        ...options,
      });
      const response = getPagingData(result, page, limit);
      resolve(response);
    } catch (error) {
      const err = _utils.getErrors(error);
      reject({
        statusCode: err.statusCode,
        data: err.data,
      });
    }
  });
module.exports = { format };
