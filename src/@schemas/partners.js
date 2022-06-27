const yup = require("yup");

const create = yup.object({
  headers: yup.object({}),
  body: yup.object({
    externalId: yup.string().uuid(),
    name: yup.string().required(),
    phone: yup.string().required(),
    gouvId: yup.string().required(),
    address: yup.string().required(),
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
