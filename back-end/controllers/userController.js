const userService = require("../services/userService");

const createNewUser = async (req, res) => {
  try {
    const { body } = req;
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

// const getPropertyByType = async(req, res) => {
//   const {
//     params: { propertyType },
//   } = req;
//   if (!propertyType) {
//     return;
//   }
//   const properties = await userService.getPropertyByType(propertyType);
//   res.send({ status: "OK", data: properties });
// };

module.exports = {
  createNewUser,
  // getAllProperties,
  // getPropertyByType
};