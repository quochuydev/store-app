const timeout = async (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

module.exports = {
  timeout,
};
