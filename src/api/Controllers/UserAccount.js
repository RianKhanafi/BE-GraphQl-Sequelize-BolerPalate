import bcrypt from "bcryptjs";
import db from "../../graphql/models/database";
import jwt from "jsonwebtoken";

module.exports = {
  loginUser: async (req, res) => {
    let { password, email } = req.body;
    try {
      let user = await db.models.users_account.findOne({
        where: {
          email: email,
        },
      });
      let combine = bcrypt.compareSync(password, user.dataValues.password);
      if (combine) {
        let token = jwt.sign({ email: email }, "secret:1234ll", {
          expiresIn: "24h",
        });
        res.json({
          message: "Login Successufily",
          token,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Login");
    }
  },
};
