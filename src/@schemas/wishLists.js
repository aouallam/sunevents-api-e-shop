const yup = require("yup");

const add = yup.object({
  headers: yup.object({
    "access-key": yup.string().required(),
  }),
  body: yup.object({
    productId: yup.string().uuid().required(),
  }),
});

const findCart = yup.object({
  headers: yup.object({
    "access-key": yup.string().required(),
  }),
});

const deleteItem = yup.object({
  headers: yup.object({
    "access-key": yup.string().required(),
  }),
  params: yup.object({
    id: yup.string().uuid().required(),
  }),
});
module.exports = { add, findCart, deleteItem };
