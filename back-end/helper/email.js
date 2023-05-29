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

const sendMail = async (mailOptions, req, res) => {
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send({ status: 'OK', data: 'Email sent successfully' });
      // res.status(200).send('Email sent successfully');
    }
  });
};

module.exports = {
  transporter,
  sendMail,
};
