const yup = require("yup");

const create = yup.object({
  headers: yup.object({}),
  body: yup.object({
    externalId: yup.string().uuid(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    civility: yup.number().oneOf([1, 2]).required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
    cgv: yup.boolean().required(),
  }),
});
const all = yup.object({
  headers: yup.object({}),
});
const one = yup.object({
  headers: yup.object({}),
  params: yup.object({
    id: yup.string().uuid().required(),
  }),
});

module.exports = { create, all, one };
