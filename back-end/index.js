const express = require('express');
const cors = require('cors');
const employeesRoutes = require('./routes/employ');
const propertyRoutes = require('./routes/property');
const userRoutes = require('./routes/user');
const { sendMail } = require('./helper/email');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3005;

app.post('/send-email', (req, res) => {
  console.log('req.body', req.body);
  const { to, subject, emailBody } = req.body;

  // Configure the email options
  const mailOptions = {
    from: 'babyboss65166516@gmail.com',
    to: to,
    subject: subject,
    text: emailBody,
  };

  sendMail(mailOptions, req, res);
});

app.get('/', (req, res) => {
  res.send('Working ...:)');
});

app.use('/employ', employeesRoutes);

app.use('/property', propertyRoutes);

app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
