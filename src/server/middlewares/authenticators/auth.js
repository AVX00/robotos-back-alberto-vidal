const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    const error = new Error("token not provided");
    error.status(401);
    next(error);
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const user = await jwt.verify(token, process.env.SECRET);
    req.userId = user.id;
    console.log(user.id);
    next();
  } catch (error) {
    next(new Error("invalid token"));
  }
};

module.exports = auth;
