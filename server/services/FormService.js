const FormModel = require("../db/Form");
const UserModel = require("../db/User");
const ResponseModel = require("../db/Response");

module.exports = {
  formsGet: async (req, res) => {
    try {
      const result = await FormModel.find();
      return res.status(200).json({
        status: 1,
        data: result,
        message: "All forms fetched successfully",
      });
    } catch (e) {
      res
        .status(500)
        .json({ status: 0, error: e, message: "Internal server error" });
    }
  },

  createForm: async (req, res) => {
    const { userId, name, description } = req.body;

    try {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ status: 0, message: "User not found" });
      }

      const newForm = await FormModel.create({
        createdBy: userId,
        name,
        description,
      });

      const updatedUser = await UserModel.findByIdAndUpdate(
        { _id: newForm.createdBy },
        {
          $push: { createdForms: newForm._id },
          new: true,
        }
      );

      return res.status(200).json({
        status: 1,
        form: newForm,
        user: updatedUser,
        message: "Form created & User updated successfully",
      });
    } catch (e) {
      res
        .status(500)
        .json({ status: 0, error: e, message: "Internal server error" });
    }
  },

  getFormById: async (req, res) => {
    const formId = req.params.formId;

    try {
      const form = await FormModel.findOne({ _id: formId });
      if (!form) {
        return res.status(404).json({ status: 0, message: "Form not found" });
      }

      return res.status(200).json({
        status: 1,
        data: form,
        message: "Form details fetched successfully",
      });
    } catch (e) {
      res
        .status(500)
        .json({ status: 0, error: e, message: "Internal server error" });
    }
  },

  deleteForm: async (req, res) => {
    // give the url
    const { formId, userId } = req.params;

    try {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ status: 0, message: "User not found" });
      }

      const form = await FormModel.findOne({ _id: formId });
      if (!form) {
        res
          .status(404)
          .json({ status: 0, message: "Form not found or already deleted" });
      }

      console.log({
        form,
        userId,
      });
      if (form.createdBy == userId) {
        await FormModel.deleteOne({ _id: formId });
        return res
          .status(200)
          .json({ status: 1, message: "Form deleted successfully" });
      } else {
        res
          .status(401)
          .json({ status: 0, message: "You are not the owner of this Form" });
      }
    } catch (e) {
      res
        .status(500)
        .json({ status: 0, error: e, message: "Internal server error" });
    }
  },

  editForm: async (req, res) => {
    const { formId, userId, name, description, questions } = req.body;

    try {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ status: 0, message: "User not found" });
      }

      const form = await FormModel.findOne({ _id: formId, createdBy: userId });
      if (!form) {
        return res.status(404).json({
          status: 0,
          message: "Form not found or user are not the owner of this form ",
        });
      }

      let updatedData = {
        name,
        description,
        questions,
      };

      const updateForm = await FormModel.findByIdAndUpdate(
        { _id: formId },
        updatedData,
        { new: true }
      );

      return res.status(200).json({
        status: 1,
        data: updateForm,
        message: "Room updated successfully",
      });
    } catch (e) {
      res
        .status(500)
        .json({ status: 0, error: e, message: "Internal server error" });
    }
  },

  getAllFormsOfUser: async (req, res) => {
    const userId = req.params.userId;

    try {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ status: 0, message: "User not found" });
      }

      const forms = await FormModel.find({ createdBy: userId });
      if (!forms) {
        return res.status(404).json({ status: 0, message: "Form not found" });
      }
      return res.status(200).json({
        status: 1,
        data: forms,
        message: "Rooms fetched successfully",
      });
    } catch (e) {
      res
        .status(500)
        .json({ status: 0, error: e, message: "Internal server error" });
    }
  },

  submitResponse: async (req, res) => {
    const { formId, email, response } = req.body;

    try {
      const form = await FormModel.findOne({ _id: formId });
      if (!form) {
        return res.status(404).json({ status: 0, message: "Form not found" });
      }

      let data = {
        formId,
        submittedBy: email,
        response,
      };
      if (data.response.length > 0) {
        const response = await ResponseModel.create(data);
        return res.status(200).json({
          status: 1,
          data: response,
          message: "Response submitted successfully",
        });
      } else {
        return res
          .status(400)
          .json({ message: "Please fill at least one field" });
      }
    } catch (e) {
      res
        .status(500)
        .json({ status: 0, error: e, message: "Internal server error" });
    }
  },

  allResponses: async (req, res) => {
    try {
      const responses = await ResponseModel.find();
      if (!responses) {
        return res
          .status(404)
          .json({ status: 0, message: "Response not found" });
      }
      return res.status(200).json({
        status: 1,
        data: responses,
        message: "Responses fetched successfully",
      });
    } catch (e) {
      res
        .status(500)
        .json({ status: 0, error: e, message: "Internal server error" });
    }
  },

  getResponse: async (req, res) => {
    const formId = req.params.formId;

    try {
      const form = await FormModel.findOne({ _id: formId });
      if (!form) {
        return res.status(404).json({ status: 0, message: "Form not found" });
      }
      const responsesById = await ResponseModel.find({ formId });
      if (!responsesById) {
        return res
          .status(404)
          .json({ status: 0, message: "Response not found" });
      }

      return res.status(200).json({
        status: 1,
        data: responsesById,
        message: "Responses by room id fetched successfully",
      });
    } catch (e) {
      res
        .status(500)
        .json({ status: 0, error: e, message: "Internal server error" });
    }
  },

  getResponseByEmail: async (req, res) => {
    const { email } = req.body;

    try {
      const responsesByEmail = await ResponseModel.find({ submittedBy: email });
      if (!responsesByEmail) {
        return res
          .status(404)
          .json({ status: 0, message: "Response not found" });
      }

      return res.status(200).json({
        status: 1,
        data: responsesByEmail,
        message: "Responses by email fetched successfully",
      });
    } catch (e) {
      res
        .status(500)
        .json({ status: 0, error: e, message: "Internal server error" });
    }
  },
};
