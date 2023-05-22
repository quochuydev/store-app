const adminGetProductApi = require("./routes/product/api.admin.product.get");
const adminGetProductListApi = require("./routes/product/api.admin.product.getList");
const webGetProductApi = require("./routes/product/api.web.product.get");
const webGetProductListApi = require("./routes/product/api.web.product.getList");

module.exports = (app, di) => {
  [
    webGetProductApi,
    webGetProductListApi,
    adminGetProductApi,
    adminGetProductListApi,
  ].forEach((handler) => {
    app.post(
      `/api/${handler.subject}`,
      ...(handler.middlewares || []),
      async function (req, res, next) {
        try {
          const validateResult = await handler.validate(
            {
              body: req.body,
              headers: req.headers,
            },
            di
          );

          if (validateResult.code !== "OK") {
            throw validateResult;
          }

          const authorizeResult = await handler.authorize(
            {
              body: req.body,
              headers: req.headers,
            },
            di
          );

          if (authorizeResult.code !== "OK") {
            throw authorizeResult;
          }

          const result = await handler.handle(
            {
              body: req.body,
              headers: req.headers,
            },
            di
          );

          if (result.code !== "OK") {
            throw result;
          }

          return res.status(200).send(result.body);
        } catch (error) {
          console.log(error);
          next(error);
        }
      }
    );
  });
};
