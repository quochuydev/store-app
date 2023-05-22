const validate = async () => {
  return {
    code: "OK",
    body: {},
  };
};

const authorize = async () => {
  return {
    code: "OK",
    body: {},
  };
};

const handle = async (_, di) => {
  const { mongoose } = di;
  const product = await mongoose.model("Product").findOne({});

  return {
    code: "OK",
    body: product,
  };
};

const handler = {
  subject: "api.web.products.get",
  validate,
  authorize,
  handle,
};

module.exports = handler;
