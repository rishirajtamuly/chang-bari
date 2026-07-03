require("dotenv").config();

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// ================================
// Middleware
// ================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// Serve Static Files
// ================================

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ================================
// Nodemailer Configuration
// ================================

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify SMTP connection
transporter.verify(function (error, success) {

    if (error) {
        console.error("SMTP ERROR:", error);
    } else {
        console.log("SMTP Server is ready to send emails.");
    }

});

// ================================
// Contact Form Route
// ================================

app.post("/contact", async (req, res) => {

    console.log("Received Request:", req.body);

    const { name, email, subject, message } = req.body;

    try {

        console.log("Sending email...");

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            replyTo: email,

            subject: `New Contact Form: ${subject}`,

            html: `
                <h2>New Contact Form Submission</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Subject:</strong> ${subject}</p>

                <p><strong>Message:</strong></p>

                <p>${message}</p>
            `

        });

        console.log("Email sent successfully.");

        res.status(200).send("Message sent successfully!");

    } catch (error) {

        console.error("EMAIL ERROR:", error);

        res.status(500).send(error.message);

    }

});

// ================================
// Start Server
// ================================

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

