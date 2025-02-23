const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure the Nodemailer transporter with your SMTP details
const transporter = nodemailer.createTransport({
  host: "smtp.example.com", // Replace with your SMTP server
  port: 587,                // Adjust port if necessary
  secure: false,            // true for 465, false for other ports
  auth: {
    user: "your_smtp_username", // Replace with your SMTP username
    pass: "your_smtp_password", // Replace with your SMTP password
  },
});

// Endpoint to handle contact form submissions
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message, consent } = req.body;

  try {
    // Email sent to the company
    const companyMailOptions = {
      from: `"Website Contact" <no-reply@yourdomain.com>`,
      to: "Native-254@gmail.com", // Company's email address
      subject: `New Contact Message from ${name}`,
      text: `
You have a new contact form submission:

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
Consent to store details: ${consent ? "Checked" : "Not Checked"}
      `,
    };

    // Confirmation email sent to the user
    const userMailOptions = {
      from: `"Native 254" <native-254@gmail.com>`,
      to: email,
      subject: "Thanks for reaching out",
      text: `
Native 254
Thanks for reaching out

Hi ${name}, we received your message and will respond soon. Here is a copy of your submission for future reference:
Name: ${name}
Email address: ${email}
Phone number: ${phone}
Message: ${message}
I allow this website to store my details: ${consent ? "Checked" : "Not Checked"}

Please do not reply to this email. It was sent from a notification-only email address that cannot accept incoming email.

Sent Nativehelpdesk, 39th street, Ruai, Nairobi, NRB 00300
      `,
    };

    // Send email to company
    await transporter.sendMail(companyMailOptions);
    // Send confirmation email to user
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "There was an error sending your message." });
  }
});

// Serve static files (like your index.html, CSS, JS) from the "public" folder if needed
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
