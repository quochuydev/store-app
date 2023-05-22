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

const handle = async (data, di) => {
  const products = await di.mongoose.model("Product").find({});

  return {
    code: "OK",
    body: {
      items: products,
    },
  };
};

const handler = {
  subject: "api.admin.product.getList",
  validate,
  authorize,
  handle,
  middlewares: [isAllow("admin")],
};

module.exports = handler;
