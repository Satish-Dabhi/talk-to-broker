const schema = require('../database/schema');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'my_secret_key';

const createNewUser = async (data) => {
  try {
    console.log('data', data);
    const doesExist = await schema.userSchema.findOne({ email: data.email });
    if (doesExist) {
      return { message: 'Email is already been registered', code: 'exist' };
    }
    const tokendata = {
      name: data.email,
      role: data.password,
    };

    const token = jwt.sign(tokendata, JWT_SECRET_KEY);
    const userData = { ...data, token: token };
    console.log('userData', userData);
    const user = new schema.userSchema(userData);
    const savedUser = await user.save();
    if(savedUser){
      return { message: 'User Created successfully', code: 'created' };
    }
    // return savedUser;
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
  return await schema.userSchema
    .find({ email: email }, function (err, result) {
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
  createNewUser,
  getUserByEmail,
  // getAllProperties,
  // getPropertyByType
};
