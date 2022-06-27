const yup = require("yup");

const create = yup.object({
  headers: yup.object({}),
  body: yup.object({
    key: yup.string().required(),
    description: yup.string(),
    type: yup.string().required(),
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
