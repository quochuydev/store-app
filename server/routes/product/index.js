module.exports = (app, di) => {
  const adminGetProductApi = require("./api.admin.product.get")(di);
  const adminGetProductListApi = require("./api.admin.product.getList")(di);
  const webGetProductApi = require("./api.web.product.get")(di);
  const webGetProductListApi = require("./api.web.product.getList")(di);

  app.post(webGetProductApi.subject, function (req, res, next) {
    webGetProductApi
      .handle({ productId: req.query.id })
      .then((result) => res.json(result))
      .catch((error) => next(error));
  });

  app.post(webGetProductListApi.subject, function (req, res, next) {
    webGetProductListApi
      .handle({})
      .then((result) => res.json(result))
      .catch((error) => next(error));
  });

  app.post(
    adminGetProductApi.subject,
    ...adminGetProductListApi.middlewares,
    function (req, res, next) {
      adminGetProductApi
        .handle({ productId: req.query.id })
        .then((result) => res.json(result))
        .catch((error) => next(error));
    }
  );

  app.post(
    adminGetProductListApi.subject,
    ...adminGetProductListApi.middlewares,
    function (req, res, next) {
      adminGetProductListApi
        .handle({})
        .then((result) => res.json(result))
        .catch((error) => next(error));
    }
  );
};
