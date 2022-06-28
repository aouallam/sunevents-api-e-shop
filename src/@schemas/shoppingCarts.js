const yup = require("yup");

const add = yup.object({
  headers: yup.object({
    "access-key": yup.string().required(),
  }),
  body: yup.object({
    productId: yup.string().uuid().required(),
    quantity: yup.number().positive().min(1).required(),
  }),
});

const set = yup.object({
  headers: yup.object({
    "access-key": yup.string().required(),
  }),
  body: yup.object({
    itemId: yup.string().uuid().required(),
    quantity: yup.number().positive().min(1).required(),
  }),
});

const findCart = yup.object({
  headers: yup.object({
    "access-key": yup.string().required(),
  }),
});

module.exports = { add, set, findCart };
