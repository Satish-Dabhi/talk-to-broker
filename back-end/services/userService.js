const schema = require('../database/schema');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'my_secret_key';
const utils = require('../helper/util');

const createNewUser = async (data) => {
  try {
    console.log('data', data);
    const verifiedUser = await schema.userSchema.findOne({ email: data.email, verified: true });
    console.log("verifiedUser",verifiedUser);
  
    if (verifiedUser) {
      return { message: 'Email is already been registered', status: 'exist' };
    }
    const doesExist = await schema.userSchema.findOne({ email: data.email });
    console.log("doesExist",doesExist);
    if (doesExist) {
      return await schema.userSchema
        .updateOne({ email: data.email }, { $set: data })
        .then((result) => {
          if (result) {
            return { message: 'User Created successfully', status: 'created' };
          } else {
            return { message: 'Something went wrong', status: 'unDone' };
          }
        })
        .catch((err) => console.warn(err));
    } else {
      const tokendata = {
        name: data.email,
        role: data.password,
      };
      const token = jwt.sign(tokendata, JWT_SECRET_KEY);
      console.log("else.........",token);
      const otp = utils.generateOTP();
      console.log("else.........",otp);

      const userData = { ...data, token: token, otp: otp, otpCreateTime: new Date() };
      console.log('userData', userData);
      const user = new schema.userSchema(userData);
      const savedUser = await user.save();
      if (savedUser) {
        return { message: 'User Created successfully', status: 'created' };
      }
    }
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

const updateUserByEmail = async (data) => {
  return await schema.userSchema
    .updateOne({ email: data.email }, { $set: data })
    .then((result) => {
      if (result) {
        return { message: 'User Updated successfully', status: 'done' };
      } else {
        return { message: 'User not Updated', status: 'unDone' };
      }
    })
    .catch((err) => console.warn(err));
};

module.exports = {
  createNewUser,
  getUserByEmail,
  updateUserByEmail,
};
