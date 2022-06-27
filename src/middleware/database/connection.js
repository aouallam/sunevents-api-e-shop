const configs = require("../../config/database.config.js");
const _database = require("../../models");

const connect = async () => {
  const environement = process.env.NODE_ENV || "dev";
  const config = configs[environement];
  return await _database.authenticate({
    model: "main",
    configs: config,
  });
};

const db = connect()
  .then((data) => (global.databases = data))
  .catch(() => {
    console.log("Error connection main");
  });

const connectionMainDb = async (req, res, next) => {
  try {
    req.mainDB = await db;
    next();
  } catch (error) {
    const statusCode = error?.statusCode || 500;
    const data = error?.data || {};
    res.status(statusCode).json(data);
  }
};

module.exports = { connectionMainDb };
