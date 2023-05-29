const express = require("express");
const cors = require('cors');
const employeesRoutes = require("./routes/employ");
const propertyRoutes = require("./routes/property");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3005;

const nodemailer = require('nodemailer');

// Create a transporter using SMTP or other transport options
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'babyboss65166516@gmail.com',
        pass: 'mjjubklxnqqcrdfo',
    },
});


app.post('/send-email', (req, res) => {
    console.log("req.body", req.body);
    const { to, subject, text } = req.body;

    // Configure the email options
    const mailOptions = {
        from: 'babyboss65166516@gmail.com',
        to: 'satidabhi555@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    // Send the email using the transporter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});



app.get("/", (req, res) => {
    res.send("Working ...:)");
});

app.use("/employ", employeesRoutes);

app.use("/property", propertyRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});