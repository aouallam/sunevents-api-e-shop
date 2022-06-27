const express = require("express");
const routes = require("./api/routes");
const consola = require("consola");
global.consola = consola;
const app = express();
app.use(express.json());
// *@ CORS
const cors = require("cors");
const { connectionMainDb } = require("./middleware/database/connection.js");
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

// *@ LIMIT
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

// *@ INIT
app.get("/", async (req, res) => {
  try {
    res.send("OK");
  } catch (error) {
    res.status(500).json(error);
  }
});

routes.forEach((route) => {
  const { access, routes } = route;
  if (access === "private") {
    routes.forEach((item) => {
      app.use("/api/v1/private", connectionMainDb, item);
    });
  } else {
    routes.forEach((item) => {
      app.use("/api/v1/public", connectionMainDb, item);
    });
  }
});

module.exports = app;
