const yup = require("yup");

const create = yup.object({
  headers: yup.object({}),
  body: yup.object({
    modelId: yup.string().uuid(),
    name: yup.string().required(),
    description: yup.string(),
    imgLink: yup.string().url(),
    priceU: yup.number().integer().positive().required(),
    tax: yup.number().positive().required(),
    stock: yup.number().integer().positive().required(),
    categories: yup.array().of(yup.string().uuid()).min(1).required(),
    attributes: yup
      .array()
      .of(
        yup.object({
          key: yup.string().required(),
          type: yup.string().required(),
          value: yup.string().required(),
          imgLink: yup.string().url(),
        })
      )
      .min(1)
      .required(),
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
