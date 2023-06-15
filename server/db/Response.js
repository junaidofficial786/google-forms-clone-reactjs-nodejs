var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var ResponseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
    },
    submittedBy: {
      type: String,
      required: true,
    },
    response: [
      {
        questionId: {
          type: String,
          default: null,
        },
        optionId: {
          type: String,
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);

ResponseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Response", ResponseSchema, "Response");
