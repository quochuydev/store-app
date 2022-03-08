module.exports = ({ app }) => {
  app.post("/auth/login", (req, res) => {
    try {
      const { email, password } = req.body;

      // const message = "Sai mật khẩu";
      // req.flash("error", message);
      // res.redirect("/login");

      const sess = req.session;
      sess.user = {
        id: "user-1",
        email: "admin@gmail.com",
      };

      res.redirect("/admin/orders");
    } catch (error) {
      res.status(500).send();
    }
  });

  app.post("/auth/logout", (req, res) => {
    res.send();
  });
};
