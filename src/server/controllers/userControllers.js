const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../dataBase/models/User");

const registerUser = async (req, res, next) => {
  const { userName, password: userPassword } = req.body;

  try {
    const password = await bcrypt.hash(userPassword, 10);
    await User.create({ userName, password });
  } catch (error) {
    next(new Error("error creating user"));
  }
};

const loginUser = async (req, res, next) => {
  const { userName, password: userPassword } = req.body;

  try {
    const { password, id } = await User.findOne({ userName });
    if (await bcrypt.compare(userPassword, password)) {
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
};

module.exports = { loginUser, registerUser };
