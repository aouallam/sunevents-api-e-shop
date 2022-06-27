const jwt = require("jsonwebtoken");

const create = (body, jwtkey, options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = jwt.sign(body, jwtkey, options);
      resolve(token);
    } catch (error) {
      reject({
        statusCode: 500,
        data: {
          message: "Server error",
          code: "server_error",
          error,
        },
      });
    }
  });

const check = ({ db, token }, jwtKey) =>
  new Promise(async (resolve, reject) => {
    try {
      const findTokenBlacklisted = await db.blacklistToken.findOne({
        where: { token },
      });
      if (findTokenBlacklisted) {
        return reject({
          statusCode: 401,
          data: {
            message: "Unauthorized - invalid or expired token",
            code: "unauthorized",
          },
        });
      }
      jwt.verify(token, jwtKey, (err, data) => {
        if (err) {
          return reject({
            statusCode: 401,
            data: {
              message: "Unauthorized - invalid or expired token",
              code: "unauthorized",
              error: err,
            },
          });
        }
        resolve(data);
      });
    } catch (error) {
      reject({
        statusCode: 500,
        object: {
          message: "Server error",
          code: "server_error",
          error,
        },
      });
    }
  });
module.exports = {
  create,
  check,
};
