const schema = require('../database/schema');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'my_secret_key';
const utils = require('../helper/util');
const { sendMail, sendVerificationMail } = require('../helper/email');


const createNewUser = async (data) => {
  try {
    const verifiedUser = await schema.userSchema.findOne({ email: data.email, verified: true });
    if (verifiedUser) {
      return { message: 'Email is already been registered', status: 'exist' };
    } else {
      const otp = utils.generateOTP();
      const doesExist = await schema.userSchema.findOne({ email: data.email });
      if (doesExist) {
        const newData = { ...data, otp: otp };
        return await schema.userSchema
          .updateOne({ email: data.email }, { $set: newData })
          .then((result) => {
            if (result) {
              sendVerificationMail(data.email, otp);
              return { message: 'User Created successfully', status: 'created' };
            } else {
              return { message: 'Something went wrong', status: 'unDone' };
            }
          })
          .catch((err) => console.warn(err));
      } else {
        const tokenData = {
          name: data.email,
          role: data.password,
        };
        const token = jwt.sign(tokenData, JWT_SECRET_KEY);
        const userData = { ...data, token: token, otp: otp, otpCreateTime: new Date() };
        const user = new schema.userSchema(userData);
        const savedUser = await user.save();
        if (savedUser) {
          sendVerificationMail(data.email, otp);
          return { message: 'User Created successfully', status: 'created' };

        }
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

const verifyOtp = async (data) => {
  const { email, otp } = data;
  return await schema.userSchema
    .find({ email: email, otp: otp }, function (err, result) {
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
  updateUserByEmail,
  verifyOtp
};
