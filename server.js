const cors = require("cors");

require("dotenv").config();

const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ================================
// Nodemailer Configuration
// ================================

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ================================
// Contact Form Route
// ================================

// app.post("/contact", async (req, res) => {

//     const { name, email, subject, message } = req.body;

//     try {

//         await transporter.sendMail({

//             from: process.env.EMAIL_USER,

//             to: process.env.EMAIL_USER,

//             subject: `New Contact Form: ${subject}`,

//             html: `
//                 <h2>New Contact Form Submission</h2>

//                 <p><strong>Name:</strong> ${name}</p>

//                 <p><strong>Email:</strong> ${email}</p>

//                 <p><strong>Subject:</strong> ${subject}</p>

//                 <p><strong>Message:</strong></p>

//                 <p>${message}</p>
//             `

//         });

//         res.send("Message sent successfully!");

//     } catch (error) {

//         console.error(error);

//         res.status(500).send("Failed to send message.");

//     }

// });


app.post("/contact", async (req, res) => {

    console.log("Received request:", req.body);

    const { name, email, subject, message } = req.body;

    try {

        console.log("Attempting to send email...");

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
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

        res.send("Message sent successfully!");

    } catch (error) {

        console.error("EMAIL ERROR:", error);

        res.status(500).send(error.message);

    }

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

