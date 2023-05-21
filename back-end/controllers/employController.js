const employService = require("../services/employService");

const getAllEmployees = async(req, res) => {
  const allEmployees = await employService.getAllEmployees();
  res.send({ status: "OK", data: allEmployees });
};

const getEmployById = async(req, res) => {
  const {
    params: { employId },
  } = req;
  if (!employId) {
    return;
  }
  const employ = await employService.getEmployById(employId);
  res.send({ status: "OK", data: employ });
};

const createNewEmploy = (req, res) => {
  const createdEmploy = employService.createNewEmploy();
  res.send("Create a new workout");
};

module.exports = {
  getAllEmployees,
  getEmployById,
  createNewEmploy
};