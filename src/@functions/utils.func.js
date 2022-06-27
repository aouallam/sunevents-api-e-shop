const randomstring = require("randomstring");
const { slug } = require("./string.func.js");
const moment = require("moment");
const current = moment();
const bcrypt = require("bcrypt");

const removeVowels = (str) => {
  return str.replace(/[aeiouy\- ]/gi, "");
};

const getErrors = (error) => {
  console.log(error);
  const statusCode = error?.statusCode || 500;
  const data = error?.data || {
    message: "Server error",
    code: "server_error",
    error,
  };
  return {
    statusCode,
    data,
  };
};

const generateIDNSchool = (zipCode, name) => {
  const nameRvVowels = removeVowels(name).slice(0, 4).toUpperCase();
  const department = zipCode.slice(0, 2);
  const random = randomstring.generate({
    length: 6,
    charset: "numeric",
  });
  return department + nameRvVowels + random;
};
const generateIDNStudent = (birthDate, firstName, lastName) => {
  const date = moment(birthDate);
  return (
    date.format("YY") +
    "-" +
    firstName[0].toUpperCase() +
    lastName.slice(0, 4).toUpperCase() +
    "-" +
    current.unix()
  );
};
const generateIDNOrder = (currentId) => {
  const currentY = current.format("YYYY");
  if (!currentId) {
    return `F${currentY}-0001`;
  }
  const split = currentId.split("-");
  const number = parseInt(split[1]) + 1;
  const newId = number.toString().padStart(4, "0");
  return `F${currentY}-${newId}`;
};

const generateTableName = (name) => {
  const nameSlug = slug(name);
  return `${nameSlug}-${current.unix()}`;
};
const parseData = (data) => {
  return JSON.parse(JSON.stringify(data));
};

const checkPassword = (password, compare) =>
  new Promise(async (resolve, reject) => {
    try {
      const valid = await bcrypt.compare(password, compare);
      if (!valid) {
        return reject({
          statusCode: 403,
          data: {
            message: "Email or password wrong",
            code: "auth_wrong",
          },
        });
      }
      resolve(valid);
    } catch (error) {
      const err = getErrors(error);
      reject({
        statusCode: err.statusCode,
        data: err.data,
      });
    }
  });

const renderQueryWhere = (fields = [], query = {}) => {
  const where = {};
  fields.forEach((item) => {
    const value = query[item];
    if (value) {
      Object.assign(where, { [item]: value });
    }
  });
  return where;
};
module.exports = {
  getErrors,
  generateIDNSchool,
  generateTableName,
  parseData,
  generateIDNStudent,
  generateIDNOrder,
  checkPassword,
  renderQueryWhere,
};
