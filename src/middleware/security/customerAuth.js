const jwt = require("jsonwebtoken");
const axios = require("axios");
const configs = require("../../config");
const _utils = require("../../@functions/utils.func.js");

const checkSE = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await axios({
        method: "post",
        url: `${configs.suneventsApi.url}/${configs.suneventsApi.fixe}/user/check`,
        data: { token },
        headers: {
          Authorization: `Bearer ${configs.suneventsApi.token}`,
        },
      });
      resolve(result.data);
    } catch (error) {
      const err = _utils.getErrors(error);
      reject({
        statusCode: err.statusCode,
        data: err.data,
      });
    }
  });

const isAuth = async (req, res, next) => {
  try {
    const accessKey = req.headers["access-key"];
    const decoded = jwt.decode(accessKey);
    const db = req.mainDB;
    if (decoded?.type === "sunevets") {
      const user = await checkSE(accessKey);
      const object = {
        externalId: user.uuid,
        firstName: user.first_name,
        lastName: user.last_name,
        phoneNumber: user.phone_number,
      };

      const [customer] = await db.customer.findOrCreate({
        where: { externalId: user.uuid, email: user.email },
        defaults: { ...user, ...object },
      });
      console.log(customer);
      req.customer = customer;
      next();
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    const statusCode = error?.statusCode || 500;
    const data = error?.data || {};
    res.status(statusCode).json(data);
  }
};
module.exports = {
  isAuth,
};
