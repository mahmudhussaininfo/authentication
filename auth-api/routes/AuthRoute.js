const express = require("express");
const {
  userLogin,
  refrshUserToken,
  userLogout,
  me,
  userRegister,
} = require("../controllers/authController");
const tokenVerify = require("../middlewares/tokenVerify");

//router
const router = express.Router();

//routing
router.route("/login").post(userLogin);
router.route("/register").post(userRegister);
router.route("/refresh").get(refrshUserToken);
router.route("/logout").post(userLogout);
router.route("/me").get(tokenVerify, me);

//export
module.exports = router;
