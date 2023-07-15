const express = require('express');
const cors = require('cors');
const propertyRoutes = require('./routes/property');
const userRoutes = require('./routes/user');
const buyerInquiryRoutes = require('./routes/buyerInquiry');
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3007;

app.get('/', (req, res) => {
  res.send('Working ...:)');
});

app.use('/property', propertyRoutes);

app.use('/user', userRoutes);

app.use('/buyer-inquiry', buyerInquiryRoutes);


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
