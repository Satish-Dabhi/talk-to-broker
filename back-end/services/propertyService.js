const db = require('../database/dbConnect');
const schema = require('../database/propertySchema');


const createNewProperty = async(data) => {
  console.log("datdatdt",data);
  try {
    const newDeveloperProperty = new schema.propertySchema(data);
    const savedDeveloperProperty = await newDeveloperProperty.save();
    return savedDeveloperProperty;
  } catch (error) {
    console.error('Failed to save developer property:', error);
    throw new Error('Failed to add developer property',error);
  }
};

module.exports = {
  createNewProperty,
};
