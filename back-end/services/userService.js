const db = require('../database/dbConnect');
const schema = require('../database/schema');


const createNewUser = async (data) => {
  try {
    console.log("data", data);
    const newDeveloperProperty = new schema.userSchema(data);
    const savedDeveloperProperty = await newDeveloperProperty.save();
    return savedDeveloperProperty;
  } catch (error) {
    throw new Error('Failed to create a user', error);
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

const getUserByEmail = async (email) => {
  return await schema.userSchema.find({ email: email }, function (err, result) {
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
  createNewUser,
  getUserByEmail,
  // getAllProperties,
  // getPropertyByType
};
