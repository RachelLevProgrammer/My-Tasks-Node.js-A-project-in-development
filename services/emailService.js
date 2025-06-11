const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // או שירות SMTP אחר, תלוי איפה יש לך מייל
  auth: {
    user: process.env.EMAIL_USER, // כתובת המייל שלך
    pass: process.env.EMAIL_PASS, // סיסמה או אפליקציה סודית (App Password)
  },
});

async function sendTaskEmail(to, subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to} with subject "${subject}"`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendTaskEmail };
