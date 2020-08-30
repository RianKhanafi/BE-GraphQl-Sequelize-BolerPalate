import bcrypt from "bcryptjs";
import db from "../../graphql/models/database";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

module.exports = {
  loginUser: async (req, res) => {
    let { password, email } = req.body;
    console.log(process.env.EMAIL);
    try {
      const user = await db.models.users_account.findOne({
        where: {
          email: email,
        },
      });
      if (user) {
        let combine = bcrypt.compareSync(password, user.dataValues.password);
        if (combine) {
          let token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
            expiresIn: "1h",
          });
          res.json({
            message: "Login Successufily",
            token,
          });
        } else {
          res.json({
            message: "Password Falid!",
          });
        }
      } else {
        res.json({
          message: "Email Not Found!",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Login...");
    }

    res.end();
  },
  forgotPassword: async (req, res) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const userEmail = await db.models.users_account.findOne({
      where: {
        email: req.body.email,
      },
    });

    const hashToken = jwt.sign(
      { email: userEmail.dataValues.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const email = {
      to: req.body.email,
      from: process.env.EMAIL,
      subject: "Test",
      html: `<a href='${process.env.SYSTEM_URL}/recovery-password/${hashToken}'>Reset Password</a>`,
      context: {
        name: "Name",
      },
    };
    transporter.sendMail(email, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        try {
          const update = db.models.users_account.update(
            { token: hashToken },
            { where: { email: req.body.email } }
          );

          if (update) {
            res.send(result);
          }
        } catch (error) {
          res.send(error);
        }
      }

      res.end();
    });
  },
  viewForgotPass: (req, res) => {
    fs.readFile(
      path.join(__dirname, "../templates/email.html"),
      (err, data) => {
        if (!err) {
          res.write(data);
        } else {
          console.log(err);
        }

        res.end();
      }
    );
  },

  setNewPassword: async (req, res) => {
    const { token } = req.params;
    let { password } = req.body;
    let verifyToken = jwt.verify(
      token,
      process.env.SECRET_KEY,
      (err, decoded) => {
        if (err) {
          return false;
        } else {
          console.log(decoded);
          req.decoded = decoded;
          return true;
        }
      }
    );
    if (verifyToken) {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt);
      password = hash;
      try {
        let reset = await db.models.users_account.update(
          {
            password: password,
            token: null,
          },
          { where: { token: token } }
        );
        res.send({
          message: "Successfuly forget password",
          token: token,
        });
      } catch (error) {
        console.log(error);
      }
    }

    res.end();
  },
};
