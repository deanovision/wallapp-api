module.exports = sendWelcomeEmail;

async function sendWelcomeEmail(req, res, next) {
  try {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: req.body.email, // new user email address
      from: process.env.VERIFIED_SENDER_EMAIL,
      subject: "Welcome to Wall App!",
      text: "Thanks for joining us at Wall App. We built this as fun way for people to connect. Over the next few weeks, we will be sending you a few more emails to provide some exciting behind-the-scenes information.",
      html: "<p>Thanks for joining us at Wall App. We built this as fun way for people to connect. Over the next few weeks, we will be sending you a few more emails to provide some exciting behind-the-scenes information.</p>",
    };
    sgMail.send(msg).then(() => {
      next();
    });
    //   .catch(() => {
    //     res
    //       .status(500)
    //       .json({ message: "internal server error, email failed to send" });
    //   });
  } catch (err) {
    res
      .status(500)
      .json({ message: "internal server error, email failed to send" });
  }
}
