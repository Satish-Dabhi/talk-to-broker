const db = require('../database/dbConnect');
const schema = require('../database/schema');

const createNewBuyerInquiry = async (data) => {
  try {
    const doesExist = await schema.buyerInquirySchema.findOne({ _id: data._id });
    if (doesExist) {
      return await schema.buyerInquirySchema
        .updateOne({ _id: data._id }, { $set: data })
        .then((result) => {
          if (result) {
            return { message: 'Buyer Inquiry Updated successfully', status: true };
          } else {
            return { message: 'Something went wrong', status: false };
          }
        })
        .catch((err) => console.warn(err));
    } else {
      const newBuyerInquiry = new schema.buyerInquirySchema(data);
      const savedBuyerInquiry = await newBuyerInquiry.save();
      return { message: 'Buyer inquiry added successfully', status: true };
    }
  } catch (error) {
    throw new Error('Failed to add buyer inquiry', error);
  }
};

const getAllBuyerInquiries = async () => {
  return await schema.buyerInquirySchema
    .find({}, function (err, result) {
      if (err) {
        throw err;
      } else {
        return result;
      }
    })
    .clone()
    .catch(function (err) {
      return err;
    });
};

const getBuyerInquiriesByUserId = async (userId) => {
  return await schema.buyerInquirySchema
    .find({ u_id: userId }, function (err, result) {
      if (err) {
        throw err;
      } else {
        return result;
      }
    })
    .clone()
    .catch(function (err) {
      return err;
    });
};

module.exports = {
  createNewBuyerInquiry,
  getAllBuyerInquiries,
  getBuyerInquiriesByUserId
};
