const propertyService = require("../services/propertyService");

const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
require("dotenv").config();


console.log("process.env.S3_ACCESS_KEY", process.env.S3_ACCESS_KEY);

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION
});

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, 'image.jpeg');
      },
    })
  });


const uploadImages2 = async (req, res) => {
  const maxCount = 5; // Set the maximum number of files allowed here
  const uploadArray = upload('talk-to-broker').array('image-upload', maxCount);

  uploadArray(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files were uploaded.' });
    }

    console.log('ok :)', req.files);
    res.status(200).json({ data: req.files });
  });
};


const uploadImages = async (req, res) => {
  console.log("........", req);
  const uploadSingle = upload('talk-to-broker').single('image-upload');
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    console.log("ok :)", req.file)
    res.status(200).json({ data: req.file });
  })
}

const createNewProperty = async (req, res) => {
  try {
    const { body } = req;
    const savedDeveloperProperty = await propertyService.createNewProperty(body);
    res.status(201).json(savedDeveloperProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
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


module.exports = {
  createNewProperty,
  getAllProperties,
  getPropertyByType,
  getPropertiesByUserId,
  uploadImages
};