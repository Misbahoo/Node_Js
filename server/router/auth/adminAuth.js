const express = require("express");
const router = express.Router();
const adminAuthController = require("../../controllers/authControllers/adminAuthController");

router.route("/").post(adminAuthController.adminLogIn);

module.exports = router;
