const nodemailer = require('nodemailer');

const GMAIL_USER =  'info.native254@gmail.com';
const GMAIL_APP_PASSWORD = 'cfbv yrfu amif gqoe';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  }, 
});

let mailOptions = {
  from: `"Your Name" <${GMAIL_USER}>`, 
  to: "info.native254@gmail.com",     
  subject: "", 
  text: "", 
  html: "<b></b>", 
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error("Error sending email:", error);
  }
  console.log("Email sent successfully!");
  console.log("Message ID:", info.messageId);
});
