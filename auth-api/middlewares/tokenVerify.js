const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const tokenVerify = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    return res.status(400).json({
      message: "unothorized",
    });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    asyncHandler(async (err, decode) => {
      if (err) {
        return res.status(400).json({
          message: "invalid token",
        });
      }
      const me = await User.findOne({ email: decode.email });
      req.me = me;
      next();
    })
  );
};

//export
module.exports = tokenVerify;
