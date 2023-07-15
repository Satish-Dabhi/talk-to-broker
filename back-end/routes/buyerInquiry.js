const express = require("express");
const buyerInquiryController = require("../controllers/buyerInquiryController");
const router = express.Router();

router.get("/", buyerInquiryController.getAllBuyerInquiries);

// router.get("/type/:propertyType", propertyController.getPropertyByType);

// router.get("/id/:propertyId", propertyController.getPropertyById);

router.get("/user/:userId", buyerInquiryController.getBuyerInquiriesByUserId);

router.post("/", buyerInquiryController.createNewBuyerInquiry);

// router.post("/uploadImages", propertyController.uploadImages);


module.exports = router;