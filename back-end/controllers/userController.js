const userService = require('../services/userService');

const createNewUser = async (req, res) => {
  try {
    const { body } = req;
    console.log('datadatadata', body);
    const savedUser = await userService.createNewUser(body);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getAllProperties = async (req, res) => {
//   const allEmployees = await userService.getAllProperties();
//   res.send({ status: "OK", data: allEmployees });
// };

const getUserByEmail = async(req, res) => {
  const {
    params: { email },
  } = req;
  if (!email) {
    return;
  }
  const user = await userService.getUserByEmail(email);
  res.send({ status: "OK", data: user });
};

module.exports = {
  createNewUser,
  getUserByEmail,
  // getAllProperties,
  // getPropertyByType
};
