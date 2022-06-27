const validation = (schema) => async (req, res, next) => {
  try {
    const { params, body, query, headers } = req;
    await schema.validate({
      params,
      body,
      query,
      headers,
    });
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = validation;
