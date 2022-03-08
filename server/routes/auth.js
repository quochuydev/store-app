const { UserModel } = require("../models/user");

module.exports = ({ app }) => {
  app.post("/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      // const message = "Sai mật khẩu";
      // res.redirect(`/login?message=${message}`);
      const user = await UserModel.findOne({ email });
      console.log(user);

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
