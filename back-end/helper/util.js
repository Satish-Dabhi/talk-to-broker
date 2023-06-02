const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

const isWithinMinutes = (time, differenceToCheck) => {
  const currentTime = new Date();
  const compareTime = new Date(time);

  const differenceInMilliseconds = currentTime - compareTime;
  const differenceInMinutes = Math.abs(differenceInMilliseconds / (1000 * 60));

  return differenceInMinutes <= differenceToCheck;
}


module.exports = {
  generateOTP,
  isWithinMinutes
};
