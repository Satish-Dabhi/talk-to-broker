const express = require("express");
const employController = require("../controllers/employController");
const router = express.Router();

router.get("/", employController.getAllEmployees);

router.get("/:employId", employController.getEmployById);

router.post("/", employController.createNewEmploy);

module.exports = router;