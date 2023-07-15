const { upload } = require("../helper/aws");
const buyerInquiryService = require("../services/buyerInquiryService");
require("dotenv").config();


const createNewBuyerInquiry = async (req, res) => {
  try {
    const { body } = req;
    const savedBuyerInquiry = await buyerInquiryService.createNewBuyerInquiry(body);
    res.status(201).json(savedBuyerInquiry);
  } catch (error) {
    res.status(500).json({ error: error.message, status: false });
  }
};

const getAllBuyerInquiries = async (req, res) => {
  const allBuyerInquiries = await buyerInquiryService.getAllBuyerInquiries();
  res.send({ status: "OK", data: allBuyerInquiries });
};

const getBuyerInquiriesByUserId = async (req, res) => {
  const {
    params: { userId },
  } = req;
  if (!userId) {
    return;
  }
  const buyerInquiries = await buyerInquiryService.getBuyerInquiriesByUserId(userId);
  res.send({ status: "OK", data: buyerInquiries });
};


module.exports = {
  createNewBuyerInquiry,
  getAllBuyerInquiries,
  getBuyerInquiriesByUserId
};