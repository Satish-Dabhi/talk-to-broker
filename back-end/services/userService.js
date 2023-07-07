const schema = require('../database/schema');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'my_secret_key';
const utils = require('../helper/util');
const { sendMail, sendVerificationMail } = require('../helper/email');

const createNewUser = async (data) => {
  try {
    const verifiedUser = await schema.userSchema.findOne({ email: data.email, verified: true });
    if (verifiedUser) {
      return { status: 'exist' };
    } else {
      const otp = utils.generateOTP();
      const doesExist = await schema.userSchema.findOne({ email: data.email });
      if (doesExist) {
        const newData = { ...data, otp: otp, otpCreateTime: new Date() };
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
        const userData = { ...data, otp: otp, otpCreateTime: new Date() };
        const user = new schema.userSchema(userData);
        const savedUser = await user.save();
        if (savedUser) {
          sendVerificationMail(data.email, otp);
          const secretKey = JWT_SECRET_KEY;
          const options = { expiresIn: '2d' };
          const payload = {
            name: data.name,
            email: data.email,
          };
          const token = jwt.sign(payload, secretKey, options);
          return {
            message: 'User Created successfully',
            status: 'created',
            token: token,
            user: {
              id: savedUser._id,
              name: savedUser.name,
              email: savedUser.email,
            },
          };
        } else {
          return { message: 'Something went wrong', status: 'unDone' };
        }
      }
    }
  } catch (error) {
    throw new Error('Failed to create a user', error);
  }
};

const userLogin = async (data) => {
  const findUser = await schema.userSchema.findOne(data);

  if (findUser) {
    const secretKey = JWT_SECRET_KEY;
    const options = { expiresIn: '2d' };
    const payload = {
      name: findUser.name,
      email: findUser.email,
    };
    const token = jwt.sign(payload, secretKey, options);
    return {
      validUser: true,
      message: 'Login successfully',
      token: token,
      user: {
        id: findUser._id,
        name: findUser.name,
        email: findUser.email,
      },
    };
    // return findUser;
  } else {
    return {
      validUser: false,
      message: 'Invalid Credential',
    };
  }
};

const updateUserByEmail = async (data) => {
  return await schema.userSchema
    .updateOne({ email: data.email }, { $set: data })
    .then((result) => {
      if (result) {
        return { status: 'done' };
      } else {
        return { status: 'unDone' };
      }
    })
    .catch((err) => console.warn(err));
};

const verifyOtp = async (data) => {
  const { email, otp } = data;
  const existUser = await schema.userSchema.findOne({ email: email, otp: otp });
  if (existUser) {
    if (utils.isWithinMinutes(existUser.otpCreateTime, 5)) {
      const verifiedUserData = {
        email: email,
        verified: true,
      };
      updateUserByEmail(verifiedUserData);
      return existUser;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const verifyToken = async (data) => {
  const { token } = data;

  if (!token) {
    return { valid: false, message: 'Unable To Authenticate !' };
  }

  try {
    const isValidToken = jwt.verify(token, JWT_SECRET_KEY);
    if (isValidToken) {
      return { valid: true };
    }
  } catch (error) {
    console.error(error);
    return { valid: false, message: 'Unable To Authenticate !' };
  }
};

module.exports = {
  createNewUser,
  userLogin,
  updateUserByEmail,
  verifyOtp,
  verifyToken,
};
