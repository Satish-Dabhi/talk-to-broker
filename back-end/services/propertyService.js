const db = require('../database/dbConnect');
const schema = require('../database/propertySchema');


const createNewProperty = async(data) => {
  try {
    const newDeveloperProperty = new schema.propertySchema(data);
    const savedDeveloperProperty = await newDeveloperProperty.save();
    return savedDeveloperProperty;
  } catch (error) {
    throw new Error('Failed to add developer property',error);
  }
};

const getAllProperties = async() => {
  return await schema.propertySchema.find({}, function(err, result) {
    if (err) {
      throw err;
    } else {
      return result;
    }
  })
  .clone()
  .catch(function(err){ console.log(err)});
};

module.exports = {
  createNewProperty,
  getAllProperties
};
