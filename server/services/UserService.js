const UserModel = require("../db/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  loginGet: async (req, res) => {
    try {
      const result = await UserModel.find().lean();
      res.status(200).json({
        status: 0,
        data: result,
        message: "All users details fetched successfully",
      });
    } catch (e) {
      res
        .status(500)
        .json({ status: 0, error: e, message: "Internal server error" });
    }
  },
  getUserDetails: async (req, res) => {
    const userId = req.params.userId;

    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ status: 0, message: "User not found" });
      }

      res.status(200).json({
        status: 1,
        data: user,
        message: "User details found successfully",
      });
    } catch (e) {
      res
        .status(500)
        .json({ status: 0, error: e, message: "Internal server error" });
    }
  },
  signup: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const result = await UserModel.create({
        name,
        userType: "admin",
        email,
        image: null,
        password: hashedPassword,
      });
      res.status(200).json({
        status: 1,
        data: result,
        message: "Admin register successfully",
      });
    } catch (e) {
      res
        .status(500)
        .json({ status: 0, error: e, message: "Internal server error" });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email }).lean();
      if (!user) {
        res.status(401).json({ status: 0, message: "Invalid credentials" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(401).json({ status: 0, message: "Invalid credentials" });
      }

      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "24h",
        }
      );

      res.status(200).json({
        status: 1,
        token: accessToken,
        data: user,
        message: "Logged in successfully",
      });
    } catch (e) {
      res
        .status(500)
        .json({ status: 0, error: e, message: "Internal server error" });
    }
  },
};
