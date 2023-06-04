const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// router.get("/", userController.getAllProperties);

router.post("/login", userController.userLogin);

router.post("/", userController.createNewUser);

router.post("/updateUser", userController.updateUserByEmail);

router.post("/verifyOtp", userController.verifyOtp);

router.post("/verifyToken", userController.verifyToken);



module.exports = router;