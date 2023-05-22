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
  const products = await mongoose.model("Product").find({});

  return {
    code: "OK",
    body: products,
  };
};

const handler = {
  subject: "api.web.products.getList",
  validate,
  authorize,
  handle,
};

module.exports = handler;
