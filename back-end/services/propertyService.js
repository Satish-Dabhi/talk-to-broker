const db = require('../database/dbConnect');
const schema = require('../database/schema');

const createNewProperty = async (data) => {
  try {
    console.log('data=---=-=', data._id);
    const doesExist = await schema.propertySchema.findOne({ _id: data._id });
    if (doesExist) {
      return await schema.propertySchema
        .updateOne({ _id: data._id }, { $set: data })
        .then((result) => {
          if (result) {
            return { message: 'Property Updated successfully', status: true };
          } else {
            return { message: 'Something went wrong', status: false };
          }
        })
        .catch((err) => console.warn(err));
    } else {
      const newDeveloperProperty = new schema.propertySchema(data);
      const savedDeveloperProperty = await newDeveloperProperty.save();
      return { message: 'Property Created successfully', status: true };
    }
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to add property', error);
  }
};

const getAllProperties = async () => {
  return await schema.propertySchema
    .find({}, function (err, result) {
      if (err) {
        throw err;
      } else {
        return result;
      }
    })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
};

const getPropertyByType = async (propertyType) => {
  return await schema.propertySchema
    .find({ propertyType: propertyType }, function (err, result) {
      if (err) {
        throw err;
      } else {
        return result;
      }
    })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
};

const getPropertyById = async (propertyId) => {
  return await schema.propertySchema
    .findOne({ _id: propertyId }, function (err, result) {
      if (err) {
        throw err;
      } else {
        return result;
      }
    })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
};

const getPropertiesByUserId = async (userId) => {
  return await schema.propertySchema
    .find({ u_id: userId }, function (err, result) {
      if (err) {
        throw err;
      } else {
        return result;
      }
    })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
};

module.exports = {
  createNewProperty,
  getAllProperties,
  getPropertyByType,
  getPropertiesByUserId,
  getPropertyById
};
