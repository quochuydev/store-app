const AdminGetProductApi = require("./api.admin.product.get");
const AdminGetProductListApi = require("./api.admin.product.getList");
const WebGetProductApi = require("./api.web.product.get");
const WebGetProductListApi = require("./api.web.product.getList");

module.exports = (app, di) => {
  app.post(WebGetProductApi(di).subject, function (req, res, next) {
    WebGetProductApi(di)
      .handle({ productId: req.query.id })
      .then((result) => res.json(result))
      .catch((error) => next(error));
  });

  app.post(WebGetProductListApi(di).subject, function (req, res, next) {
    WebGetProductListApi(di)
      .handle({})
      .then((result) => res.json(result))
      .catch((error) => next(error));
  });

  app.post(AdminGetProductApi(di).subject, function (req, res, next) {
    AdminGetProductApi(di)
      .handle({ productId: req.query.id })
      .then((result) => res.json(result))
      .catch((error) => next(error));
  });

  app.post(AdminGetProductListApi(di).subject, function (req, res, next) {
    AdminGetProductListApi(di)
      .handle({})
      .then((result) => res.json(result))
      .catch((error) => next(error));
  });
};
