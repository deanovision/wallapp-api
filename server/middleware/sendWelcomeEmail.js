"use strict";
const nodemailer = require("nodemailer");
module.exports = sendEmail;
async function sendEmail(req, res) {
  try {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      pool: true,
      host:
        process.env.NODE_ENV === "test"
          ? "smtp.ethereal.email"
          : "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        type: "login",
        user:
          process.env.NODE_ENV === "test"
            ? testAccount.user
            : process.env.APP_EMAIL,
        pass:
          process.env.NODE_ENV === "test"
            ? testAccount.pass
            : process.env.APP_PASSWORD,
      },
    });

    const msg = {
      to: req.body.email, // new user email address
      from: '"The Wall App" <therealwallapp@gmail.com>',
      subject: "Welcome to Wall App!",
      text: "Thanks for joining us at Wall App. We built this as fun way for people to connect. Over the next few weeks, we will be sending you a few more emails to provide some exciting behind-the-scenes information.",
      html: "<p>Thanks for joining us at Wall App. We built this as fun way for people to connect. Over the next few weeks, we will be sending you a few more emails to provide some exciting behind-the-scenes information.</p>",
    };
    let email = await transporter.sendMail(msg);
    //during tests log a preview url of the email sent
    process.env.NODE_ENV === "test" &&
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(email));
    res.status(200).json(email.accepted);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}
