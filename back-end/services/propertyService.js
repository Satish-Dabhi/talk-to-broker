const db = require('../database/dbConnect');
const schema = require('../database/schema');


const createNewProperty = async (data) => {
  try {
    console.log("data=---=-=", data);
    const newDeveloperProperty = new schema.propertySchema(data);
    console.log("newDeveloperProperty", newDeveloperProperty);
    const savedDeveloperProperty = await newDeveloperProperty.save();
    return savedDeveloperProperty;
  } catch (error) {
    throw new Error('Failed to add property', error);
  }
};

const getAllProperties = async () => {
  return await schema.propertySchema.find({}, function (err, result) {
    if (err) {
      throw err;
    } else {
      return result;
    }
  })
    .clone()
    .catch(function (err) { console.log(err) });
};

const getPropertyByType = async (propertyType) => {

  return await schema.propertySchema.find({ propertyType: propertyType }, function (err, result) {
    if (err) {
      throw err;
    } else {
      return result;
    }
  })
    .clone()
    .catch(function (err) { console.log(err) });
};

const getPropertiesByUserId = async (userId) => {

  return await schema.propertySchema.find({ u_id: userId }, function (err, result) {
    if (err) {
      throw err;
    } else {
      return result;
    }
  })
    .clone()
    .catch(function (err) { console.log(err) });
};

module.exports = {
  createNewProperty,
  getAllProperties,
  getPropertyByType,
  getPropertiesByUserId
};
