const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @desc get access token
 * @route post / login
 * @access PUBLIC
 */

const userLogin = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  // find user
  const userFind = await User.findOne({ email });
  if (!userFind) {
    return res.status(400).json({
      message: "User not fount haramjada",
    });
  }

  //password check
  const passCheck = await bcrypt.compare(password, userFind.password);

  if (!passCheck) {
    return res.status(400).json({
      message: "password invalid",
    });
  }

  //Access Token
  const accessToken = jwt.sign(
    {
      email: userFind.email,
      role: userFind.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );

  //refrest Token
  const refreshToken = jwt.sign(
    {
      email: userFind.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    }
  );

  res.cookie("refToken", refreshToken, {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.status(200).json({
    token: accessToken,
  });
});

/**
 * @desc get refrsh token data
 * @route GET /refresh
 * @access PUBLIC
 */

const refrshUserToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refToken) {
    res.status(400).json({
      message: "invalid token",
    });
  }
  const token = cookies.refToken;

  jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decode) => {
      if (err) {
        return res.status(400).json({
          message: "invalid token",
        });
      }
      const tokenUser = await User.findOne({
        email: decode.email,
      });
      if (!tokenUser) {
        return res.status(404).json({
          message: "Token user not Found",
        });
      }

      //Access Token
      const accessToken = jwt.sign(
        {
          email: tokenUser.email,
          role: tokenUser.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        }
      );

      res.status(200).json({
        token: accessToken,
      });
    })
  );
};

/**
 * @desc Logout user
 * @route post /logout
 * @access PUBLIC
 */

const userLogout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refToken) {
    return res.status(404).json({
      message: "invalid request",
    });
  }
  res
    .clearCookie("refToken", {
      httpOnly: true,
      secure: false,
    })
    .json({
      message: "logout Successfully",
    });
};

//export
module.exports = { userLogin, refrshUserToken, userLogout };
