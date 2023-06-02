const userService = require('../services/userService');

const createNewUser = async (req, res) => {
  try {
    const { body } = req;
    const savedUser = await userService.createNewUser(body);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { body } = req;
    const user = await userService.userLogin(body);
    if (user) {
      res.status(201).json({ validUser: true, token: user });
    } else {
      res.status(201).json({ validUser: false, error: 'Invalid Credential' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserByEmail = async (req, res) => {
  try {
    const { body } = req;
    const updatedUser = await userService.updateUserByEmail(body);
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { body } = req;
    const updatedUser = await userService.verifyOtp(body);
    if (updatedUser.length == 0) {
      res.send({ status: 'OK', verify: false });
    } else {
      res.send({ status: 'OK', verify: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewUser,
  userLogin,
  updateUserByEmail,
  verifyOtp,
};
