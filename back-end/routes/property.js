const express = require("express");
const propertyController = require("../controllers/propertyController");
const router = express.Router();

router.get("/", propertyController.getAllProperties);

router.get("/:propertyType", propertyController.getPropertyByType);

router.post("/", propertyController.createNewProperty);

module.exports = router;