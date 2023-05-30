const db = require('../database/dbConnect');
const schema = require('../database/schema');


const createNewUser = async(data) => {
  try {
    console.log("data",data);
    const newDeveloperProperty = new schema.userSchema(data);
    const savedDeveloperProperty = await newDeveloperProperty.save();
    return savedDeveloperProperty;
  } catch (error) {
    throw new Error('Failed to create a user',error);
  }
};

// const getAllProperties = async() => {
//   return await schema.propertySchema.find({}, function(err, result) {
//     if (err) {
//       throw err;
//     } else {
//       return result;
//     }
//   })
//   .clone()
//   .catch(function(err){ console.log(err)});
// };

// const getPropertyByType = async(propertyType) => {

//   return await schema.propertySchema.find({propertyType : propertyType}, function(err, result) {
//     if (err) {
//       throw err;
//     } else {
//       return result;
//     }
//   })
//   .clone()
//   .catch(function(err){ console.log(err)});
// };

module.exports = {
  createNewUser,
  // getAllProperties,
  // getPropertyByType
};
