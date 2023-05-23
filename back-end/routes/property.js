const express = require("express");
const propertyController = require("../controllers/propertyController");
const router = express.Router();

router.get("/", propertyController.getAllProperties);

// router.get("/:propertyId", propertyController.getPropertyById);

router.post("/", propertyController.createNewProperty);

module.exports = router;