require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());

// Load environment variables
const PORT = process.env.PORT || 5000;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Debugging: Check if environment variables are loaded correctly
console.log("✅ Server starting...");
console.log("📧 Email User:", EMAIL_USER ? "Loaded" : "Not Loaded");
console.log("🔑 Email Password:", EMAIL_PASS ? "Loaded" : "Not Loaded");
console.log("🚀 Running on Port:", PORT);

app.post('/join-waitlist', async (req, res) => {
    const { email } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: EMAIL_USER, pass: EMAIL_PASS }
    });

    let mailOptions = {
        from: EMAIL_USER,
        to: 'recipient-email@gmail.com',
        subject: 'New Waitlist Entry',
        text: `New user joined the waitlist: ${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("❌ Email sending error:", error);
            return res.status(500).send(error.toString());
        }
        console.log("✅ Email sent successfully:", info.response);
        res.status(200).send("Email sent: " + info.response);
    });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
