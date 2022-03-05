const GetProductListApi = require("./api.product.getList");
const GetProductApi = require("./api.product.get");

module.exports = ({ app, di }) => {
  app.post(GetProductListApi(di).subject, function (req, res, next) {
    GetProductListApi.handle({})
      .then((res) => res.json(result))
      .catch((error) => next(error));
  });

  app.post(GetProductApi(di).subject, function (req, res, next) {
    GetProductApi.handle({ productId: req.query.id })
      .then((res) => res.json(result))
      .catch((error) => next(error));
  });
};
