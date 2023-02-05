const express = require("express");
const router = express.Router();
const studentAuthController = require("../../controllers/authControllers/studentAuthController");

router.route("/").post(studentAuthController.examLogIn);

module.exports = router;
