module.exports = (di) => {
  const validate = async () => {
    return true;
  };

  const authorize = async () => {
    return true;
  };

  const handle = async ({ productId }) => {
    return { productId };
  };

  return {
    subject: "/api.admin.products.get",
    validate,
    authorize,
    handle,
  };
};
