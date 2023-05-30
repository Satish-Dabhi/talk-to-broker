const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// router.get("/", userController.getAllProperties);

// router.get("/:propertyType", userController.getPropertyByType);

router.post("/", userController.createNewUser);

module.exports = router;