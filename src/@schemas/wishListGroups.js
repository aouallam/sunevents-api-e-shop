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

const findOne = yup.object({
  headers: yup.object({
    "access-key": yup.string().required(),
  }),
});

const delWishListGroup = yup.object({
  headers: yup.object({
    "access-key": yup.string().required(),
  }),
  params: yup.object({
    id: yup.string().uuid().required(),
  }),
});
module.exports = { add, findOne, delWishListGroup };
