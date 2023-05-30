const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// router.get("/", userController.getAllProperties);

router.get("/:email", userController.getUserByEmail);

router.post("/", userController.createNewUser);

module.exports = router;