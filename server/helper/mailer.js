import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  secure: false, // true for 465, false for
  auth: {
    user: "hmzaeer@gmail.com",
    pass: "pixpwirpdbxpbmgr",
  },
  tls: {
    rejectUnauthorized: false, // Trust self-signed certificate
  },
});
//part  2

export const SendConfirmationEmail = (option, email, activationCode) => {
  let subject, text;

  if (option === "register") {
    subject = "confirmation your  account";
    text = `<div>
<h1> Email de Confirmation </h1>
<p>Pour activer votre compte , veuiller clicker sur ce lien </p>
<a href=http://localhost:5173/confirm/${activationCode}> clicker ici </a>

</div>`;
  } else {
    subject = "to reset your pass click here ";
    text = `<div>
<h1> Email de forget pass </h1>
<p>to reset your  password click on this link : </p>
<a href=http://localhost:5173/forget/${activationCode}> clicker ici </a>

</div>`;
  }

  transport
    .sendMail({
      from: "hmzaeer@gmail.com",
      to: email,
      subject: subject,
      html: text,
    })
    .catch((err) => console.log("error in sending mail " + err));
};
export const sendEmailAppoinement = (qrcode, type, info) => {
  console.log("image path", qrcode);
  transport
    .sendMail({
      from: "hmzaeer@gmail.com",
      to: info.email,
      subject: `Congratulations ${info.name}, Your Appointment is Confirmed!`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif;">

  <h1 style="color: #007bff;">Appointment Confirmation</h1>

  <p>Your appointment has been confirmed on ${type}. Below are the appointment details:</p>

  <ul>
    <li><strong>Name:</strong> ${info.name}</li>
    <li><strong>Date:</strong> ${info.date}</li>
  </ul>



  <p style="margin-top: 20px;">Thank you for choosing our service.</p>
  <p style="margin-top: 20px;">download the attachement it is required</p>

</body>
</html>`,
      attachments: [
        {
          filename: "qrcode.png",
          content: qrcode.split(";base64,")[1],
          encoding: "base64",
          cid: "qrcode",
        },
      ],
    })
    .catch((err) => console.log("Error in sending mail: " + err));
};

export default { SendConfirmationEmail };
