const express = require("express");
const {
  userLogin,
  refrshUserToken,
  userLogout,
} = require("../controllers/authController");

//router
const router = express.Router();

//routing
router.route("/login").post(userLogin);
router.route("/refresh").get(refrshUserToken);
router.route("/logout").post(userLogout);

//export
module.exports = router;
