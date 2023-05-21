const db = require('../database/dbConnect');
const schema = require('../database/useSchema');

const getAllEmployees = async() => {
  return await schema.collegeSchema.find({}, function(err, result) {
    if (err) {
      throw err;
    } else {
      return result;
    }
  })
  .clone()
  .catch(function(err){ console.log(err)});
};

const getEmployById = async(employId) => {
  return await schema.collegeSchema.find({name : employId}, function(err, result) {
    if (err) {
      throw err;
    } else {
      return result;
    }
  })
  .clone()
  .catch(function(err){ console.log(err)});
};

const createNewEmploy = () => {
  return;
};

module.exports = {
  getAllEmployees,
  getEmployById,
  createNewEmploy,
};
