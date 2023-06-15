var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["admin", "guest"],
      default: "admin",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    createdForms: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", UserSchema, "Users");
