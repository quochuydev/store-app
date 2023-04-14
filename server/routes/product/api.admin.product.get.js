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

const handle = async () => {
  const products = await di.mongoose.model("Product").find({});

  return {
    body: products,
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
