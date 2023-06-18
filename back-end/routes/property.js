const express = require("express");
const propertyController = require("../controllers/propertyController");
const router = express.Router();

router.get("/", propertyController.getAllProperties);

router.get("/type/:propertyType", propertyController.getPropertyByType);

router.get("/user/:userId", propertyController.getPropertiesByUserId);

router.post("/", propertyController.createNewProperty);

router.post("/uploadImages", propertyController.uploadImages);


module.exports = router;