const yup = require("yup");

const add = yup.object({
  headers: yup.object({
    "access-key": yup.string().required(),
  }),
  body: yup.object({
    name: yup.string().required(),
    customerId: yup.string().uuid().required(),
  }),
});

module.exports = { add };
