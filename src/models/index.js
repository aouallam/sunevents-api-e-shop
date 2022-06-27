const Sequelize = require("sequelize");
const { fromDir } = require("../@functions/routes.func.js");

const authenticate = ({ model, configs = {} }) =>
  new Promise(async (resolve, reject) => {
    try {
      const paths = fromDir(`${__dirname}/${model}`, "js");
      const { username, password, database, options } = configs;
      const sequelize = new Sequelize(database, username, password, options);
      await sequelize.authenticate();
      const db = {};
      paths.forEach((path) => {
        const _func = require(path);
        const model = _func(sequelize, Sequelize);
        db[model.name] = model;
      });

      db.sequelize = sequelize;
      db.Sequelize = Sequelize;

      Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
          db[modelName].associate(db);
        }
      });
      resolve(db);
    } catch (error) {
      console.log(error);
      reject({
        statusCode: 502,
        data: {
          message: error?.original?.sqlMessage || "Unable to connect ",
          code: "database_connection",
        },
      });
    }
  });

module.exports = { authenticate };
