var router = require("express").Router();
const {
  createForm,
  formsGet,
  getFormById,
  deleteForm,
  editForm,
  getAllFormsOfUser,
  allResponses,
  submitResponse,
  getResponse,
  getResponseByEmail,
} = require("../services/FormService");

router.route("/allForms").get(formsGet);
router.route("/create").post(createForm);
router.route("/form/:formId").get(getFormById);
router.route("/deleteForm/:formId/:userId").delete(deleteForm);
router.route("/editForm").put(editForm);
router.route("/getUserForms/:userId").get(getAllFormsOfUser);
router.route("/addResponse").post(submitResponse);
router.route("/responses").get(allResponses);
router.route("/getResponse/:formId").get(getResponse);
router.route("/getResponseByEmail").get(getResponseByEmail);

module.exports = router;
