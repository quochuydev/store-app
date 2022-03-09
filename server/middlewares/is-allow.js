const isAllow = (permission) => {
  return function (req, res, next) {
    const sess = req.session;
    console.log("user:", sess?.user, permission);

    if (sess?.user) {
      res.locals = {
        user: sess?.user,
      };

      return next();
    }

    return res.sendStatus(401);
    // return res.redirect("/login");
  };
};

module.exports = {
  isAllow,
};
