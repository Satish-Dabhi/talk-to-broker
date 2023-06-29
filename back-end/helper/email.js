const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'babyboss65166516@gmail.com',
    pass: 'mjjubklxnqqcrdfo',
  },
});

const sendMail = async (mailOptions) => {
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    } else {
      return ({ status: 'OK', data: 'Email sent successfully' });
    }
  });
};

const sendVerificationMail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM_ADDRESS,
    to: email,
    subject: process.env.VERIFICATION_MAIL_SUBJECT,
    text: `Your Verification code is : ${otp}`,
  };
  return sendMail(mailOptions);
}

module.exports = {
  transporter,
  sendMail,
  sendVerificationMail
};
