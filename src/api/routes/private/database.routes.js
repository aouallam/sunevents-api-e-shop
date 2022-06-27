const express = require("express");
const { getErrors } = require("../../../@functions/utils.func.js");

const router = express.Router();

router.post("/init-db", async (req, res) => {
  try {
    const { mainDB, body } = req;
    mainDB.sequelize.sync(body || { alter: true }).then(() => {
      res.send({ message: "alter and re-sync db." });
    });
  } catch (error) {
    const err = getErrors(error);
    res.status(err.statusCode).json(err.data);
  }
});

module.exports = router;
