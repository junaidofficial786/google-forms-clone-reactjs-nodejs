var mongoose = require("mongoose");

var imageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Image", imageSchema);
