const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../dataBase/models/User");

const registerUser = async (req, res, next) => {
  const { userName, password: userPassword } = req.body;

  try {
    const userFoundInDB = await User.findOne({ userName });
    if (!userFoundInDB) {
      const password = await bcrypt.hash(userPassword, 10);
      await User.create({ userName, password });
      res.status(201).json({ user: "created" });
      return;
    }
    res.status(409).json({ error: "userName taken" });
  } catch (error) {
    next(new Error("error creating user"));
  }
};

const loginUser = async (req, res, next) => {
  const { userName, password: userPassword } = req.body;

  try {
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(400).json({ error: "invalid username or password" });
    }
    if (await bcrypt.compare(userPassword, user.password)) {
      const token = jwt.sign({ userName, id: user.id }, process.env.SECRET, {
        expiresIn: "4d",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "invalid username or password" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser, registerUser };
