const { upload } = require("../helper/aws");
const propertyService = require("../services/propertyService");
require("dotenv").config();



const uploadImages2 = async (req, res) => {
  const maxCount = 5; // Set the maximum number of files allowed here
  const uploadArray = upload(process.env.S3_BUCKET_NAME).array('file', maxCount);

  uploadArray(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files were uploaded.' });
    }
    res.status(200).json({ data: req.files });
  });
};


const uploadImages = async (req, res) => {
  const userId = req.body.u_id;
  const uploadSingle = upload(process.env.S3_BUCKET_NAME).single('file');
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    console.log(".....req?.file",req?.file);
    res.status(200).json({ success: true, url: req?.file?.location });
  })
}

const createNewProperty = async (req, res) => {
  try {
    const { body } = req;
    const savedDeveloperProperty = await propertyService.createNewProperty(body);
    res.status(201).json(savedDeveloperProperty);
  } catch (error) {
    res.status(500).json({ error: error.message, status: false });
  }
};

const getAllProperties = async (req, res) => {
  const allEmployees = await propertyService.getAllProperties();
  res.send({ status: "OK", data: allEmployees });
};

const getPropertyByType = async (req, res) => {
  const {
    params: { propertyType },
  } = req;
  if (!propertyType) {
    return;
  }
  const properties = await propertyService.getPropertyByType(propertyType);
  res.send({ status: "OK", data: properties });
};

const getPropertiesByUserId = async (req, res) => {
  const {
    params: { userId },
  } = req;
  if (!userId) {
    return;
  }
  const properties = await propertyService.getPropertiesByUserId(userId);
  res.send({ status: "OK", data: properties });
};

const getPropertyById = async (req, res) => {
  const {
    params: { propertyId },
  } = req;
  if (!propertyId) {
    return;
  }
  const properties = await propertyService.getPropertyById(propertyId);
  res.send({ status: "OK", data: properties });
};


module.exports = {
  createNewProperty,
  getAllProperties,
  getPropertyByType,
  getPropertiesByUserId,
  getPropertyById,
  uploadImages
};