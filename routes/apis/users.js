const { Router } = require("express");

const userRouter = Router({ mergeParams: true });

const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../../config");
const argon2 = require("argon2");
const { requireUser } = require("../../middleware/auth");
const { generateToken } = require("../../services/token");
const User = require("../../models/User");

const {
  createUser,
  findUserByUserName,
  findById,
  verifyPassword,
} = require("../../services/users");

userRouter
  .get("/", requireUser, async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }
      res.json({ success: true, user });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  })

  .post("/register/:type", async (req, res) => {
    const typeUser = req.params.type;
    const { username, password, confirmPassword } = req.body;

    if (!username) {
      return res.status(400).json({ message: "username not empty" });
    }

    if (!password) {
      return res.status(400).json({ message: "password not empty" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "password not match" });
    }
    try {
      findUserByUserName(username)
        .then((foundUser) => {
          if (foundUser) {
            res
              .status(400)
              .json({ success: false, message: `Username is existing !!` });
            return;
          }
          return Promise.resolve(true);
        })
        .then(() => {
          return createUser(username, password, typeUser)
            .then((createdUser) => {
              generateToken(res, createdUser);
              return res.redirect(`/items/index`);
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({ success: false, message: error });
            });
        });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal error" });
    }
  })

  .post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing username and/or password" });
    }

    try {
      const foundUser = await User.findOne({ username: username });

      if (!foundUser)
        return res.status(400).json({
          success: false,
          message: "Incorrect username or password",
        });
      const passwordValid = await argon2.verify(foundUser.password, password);
      if (!passwordValid)
        return res.status(400).json({
          success: false,
          message: "Incorrect username or password",
        });
      generateToken(res, foundUser);
      return res.redirect(`/items/index`);
    } catch (error) {
      return res.status(500).json({ message: "Internal error" });
    }
  })
  .get("/login", requireUser, (req, res) => {
    res.json(req.user);
  })
  .get("/logout", (req, res) => {
    res.cookie("token", null, { maxAge: -1 });
    res.redirect("/items/index");
  });

module.exports = userRouter;
