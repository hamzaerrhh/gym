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

export default { SendConfirmationEmail };
