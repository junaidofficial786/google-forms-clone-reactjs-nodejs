var router = require("express").Router();

const UserRouter = require("./UserRouter");
const FormRouter = require("./FormRouter");

// user and form routes
router.use("/user", UserRouter);
router.use("/form", FormRouter);

// for all routes checking
router.get("/", (req, res) => {
  res.send("Router.js working fine");
});

module.exports = router;
