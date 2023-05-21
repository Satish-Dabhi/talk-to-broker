const propertyService = require("../services/propertyService");

const createNewProperty = async(req, res) => {
  try {
    const { body } = req;
    const savedDeveloperProperty = await propertyService.createNewProperty(body);
    res.status(201).json(savedDeveloperProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewProperty
};