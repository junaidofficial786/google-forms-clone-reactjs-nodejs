var router = require("express").Router();
const UserService = require("../services/UserService");
// const { authMiddleware } = require("../middleware/authMiddleware");

router.route("/login").get(UserService.loginGet).post(UserService.login);
router.route("/signup").post(UserService.signup);
router.route("/getDetails/:userId").get(UserService.getUserDetails);

module.exports = router;
