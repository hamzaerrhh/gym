import nodemailer from "nodemailer";
//you should 2 part
//1 transpre acces to the email
//2 email content
//less secure app
//start the 1 part
const transport = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  secure: false, // true for 465, false for
  auth: {
    user: "hmzaeer@gmail.com",
    pass: process.env.EMAIL_APP,
  },
  tls: {
    rejectUnauthorized: false, // Trust self-signed certificate
  },
});
//part  2

export const SendConfirmationEmail = (type, email, activationCode) => {
  transport
    .sendMail({
      from: "hmzaeer@gmail.com",
      to: email,
      subject: type,
      html: `<div>
<h1> Email de Confirmation </h1>
<p>Pour activer votre compte , veuiller clicker sur ce lien </p>
<a href=http://localhost:3000/confirm/${activationCode}> clicker ici </a>

</div>`,
    })
    .catch((err) => console.log("error in sending mail " + err));
};

export default { SendConfirmationEmail };
