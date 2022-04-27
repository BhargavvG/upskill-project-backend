const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  let cred = {
    user: "myntra.project.test@gmail.com",
    password: "myntra@test",
  };

  let { subject, template, to } = req.body;
  console.log(template)
  try {
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: cred.user,
        pass: cred.password,
      },
    });

    var mailDetails = {
      from: cred.user,
      to: to,
      subject: subject,
      html: template,
    };

    transporter.sendMail(mailDetails, (err, info) => {
      if (err) {
          console.log(err)
        res.status(204).send(err);
      } else {
        res.status(200).send("mail sent");
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
