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
    const { email, password } = body;
    if (!email) {
      res.status(401).json({ validUser: false, message: 'Invalid email' });
    }
    if (!password) {
      res.status(401).json({ validUser: false, message: 'Invalid password' });
    }
    const user = await userService.userLogin(body);
    res.status(201).json(user);
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
    if (updatedUser) {
      res.send({ status: 'OK', verify: true });
    } else {
      res.send({ status: 'OK', verify: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyToken = async (req, res) => {
  try {
    const { body } = req;
    const updatedUser = await userService.verifyToken(body);
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewUser,
  userLogin,
  updateUserByEmail,
  verifyOtp,
  verifyToken,
};
