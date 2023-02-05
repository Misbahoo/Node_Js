const studentResultController = require("../controllers/updateResultController");
const express = require("express");

const router = express.Router();

router.route("/:id").put(studentResultController.updateResult);

module.exports = router;
