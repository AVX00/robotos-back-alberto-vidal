const express = require("express");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const User = require("../../dataBase/models/User");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { userName, password: userPassword } = req.body;

  try {
    const password = await argon2.hash(userPassword);
    await User.create({ userName, password });
  } catch (error) {
    next(new Error("error creating user"));
  }
});

router.post("/login", async (req, res, next) => {
  const { userName, password: userPassword } = req.body;

  try {
    const { password, id } = await User.findOne({ userName });
    if (await argon2.verify(password, userPassword)) {
      const token = jwt.sign({ userName, id }, process.env.SECRET, {
        expiresIn: "4d",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "incorrect password" });
    }
  } catch (error) {
    next(error);
  }
});
