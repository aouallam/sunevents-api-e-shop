const _utils = require("../@functions/utils.func.js");
const _pagination = require("../@functions/pagination.func.js");
const _geoCode = require("../@functions/geoCode.func");

const create = ({ db, body, validate }) =>
  new Promise(async (resolve, reject) => {
    try {
      const geocode = await _geoCode.geoCode(body.address);
      const element = geocode[0];
      const object = {
        lat: element.latitude,
        lng: element.longitude,
        country: element.country,
        city: element.city,
        region: element.administrativeLevels.level1long,
        zipCode: element.zipcode,
        address: `${element.streetNumber} ${element.streetName}`,
      };
      const [partner, created] = await db.partner.findOrCreate({
        where: { gouvId: body.gouvId },
        defaults: { ...body, ...object },
      });
      if (!created && validate) {
        return reject({
          statusCode: 409,
          data: {
            message: "Partner already exists",
            code: "partner_exist",
          },
        });
      }
      resolve(partner);
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
      const partner = await db.partner.findByPk(id, {
        where: objWhere,
        include: arrayInclude.concat(include),
      });
      if (!partner && validate) {
        return reject({
          statusCode: 404,
          data: {
            message: "Partner not found",
            code: "partner_not_found",
          },
        });
      }
      resolve(partner);
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
          table: "partner",
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
