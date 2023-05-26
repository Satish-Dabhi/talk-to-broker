const propertyService = require("../services/propertyService");

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

const getPropertyByType = async(req, res) => {
  const {
    params: { propertyType },
  } = req;
  if (!propertyType) {
    return;
  }
  const properties = await propertyService.getPropertyByType(propertyType);
  res.send({ status: "OK", data: properties });
};

module.exports = {
  createNewProperty,
  getAllProperties,
  getPropertyByType
};