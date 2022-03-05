module.exports = (di) => {
  const validate = async () => {
    return true;
  };

  const authorize = async () => {
    return true;
  };

  const handle = async () => {
    const { mongoose } = di;
    const products = await mongoose.model("Product").find({});
    return products;
  };

  return {
    subject: "api.products.getList",
    validate,
    authorize,
    handle,
  };
};
