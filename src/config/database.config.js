module.exports = {
  test: {
    username: "root",
    password: "root",
    database: "sunevents-e-shop",
    options: {
      host: "127.0.0.1",
      dialect: "mysql",
      timezone: "+02:00",
    },
  },
  dev: {
    username: "root",
    password: "root",
    database: "sunevents-e-shop",
    options: {
      host: "127.0.0.1",
      dialect: "mysql",
      timezone: "+02:00",
    },
  },
  prod: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "sunevents-e-shop",
    options: {
      host: process.env.DB_HOST,
      dialect: "mysql",
      timezone: "+02:00",
    },
  },
};
