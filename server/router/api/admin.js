const express = require("express");
router = express.Router();
const adminController = require("../../controllers/adminController");

router.route("/").post(adminController.createAdmin);

module.exports = router;
