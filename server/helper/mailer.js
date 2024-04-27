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

export const SendConfirmationEmail = (email, activationCode) => {
  transport
    .sendMail({
      from: "hmzaeer@gmail.com",
      to: email,
      subject: "confirmation your  account",
      html: `<div>
<h1> Email de Confirmation </h1>
<p>Pour activer votre compte , veuiller clicker sur ce lien </p>
<a href=http://localhost:5173/confirm/${activationCode}> clicker ici </a>

</div>`,
    })
    .catch((err) => console.log("error in sending mail " + err));
};

export default { SendConfirmationEmail };
