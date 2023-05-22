const { isAllow } = require("../../middlewares/is-allow");

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
  const product = await di.mongoose.model("Product").findOne({});

  return {
    code: "OK",
    body: product,
  };
};

const handler = {
  subject: "api.admin.products.get",
  validate,
  authorize,
  handle,
  middlewares: [isAllow("admin")],
};

module.exports = handler;
