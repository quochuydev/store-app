const timeout = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

module.exports = { timeout };
