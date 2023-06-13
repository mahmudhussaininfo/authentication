const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @desc get access token
 * @route post / register
 * @access PUBLIC
 */

const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      message: "invalid register",
    });
  }

  // email existance
  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // hash password
  const hash = await bcrypt.hash(password, 10);

  // create new user data
  const user = await User.create({ name, email, password: hash });

  // check
  if (user) {
    return res.status(201).json({ message: "User created successful", user });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

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
      message: "User not found haramjada",
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
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );

  //refrest Token
  // const refreshToken = jwt.sign(
  //   {
  //     email: userFind.email,
  //   },
  //   process.env.REFRESH_TOKEN_SECRET,
  //   {
  //     expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  //   }
  // );

  res.cookie("accessToken", accessToken, {
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
 * @desc get me
 * @route GET / me
 * @access PUBLIC
 */

const me = (req, res) => {
  if (!req.me) {
    return res.status(400).json({
      message: "user not found",
    });
  }
  res.status(200).json({
    user: req.me,
  });
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
module.exports = { userLogin, refrshUserToken, userLogout, me, userRegister };
