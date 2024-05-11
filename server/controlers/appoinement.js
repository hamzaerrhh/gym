import Appoinement from "../models/appoinments.js";
import generate from "../helper/qrCodeGenarate.js";
import { sendEmailAppoinement } from "../helper/mailer.js";
import User from "../models/user.js";
const Action = {
  add: async (req, res) => {
    console.log(req.user);
    console.log("start adding ...");
    /////after i should check the avalibité of days
    try {
      console.log(req.body);

      // add the apppoinement
      const appoinement = new Appoinement({
        user_id: req.user._id,
        info: req.body.info,
        appointmentType: req.body.appointmentType,
        reservationTime: req.body.reservationTime,
      });

      await appoinement.save();
      // find user by id

      let qrcodeData = `UserID=${req.user._id}&AppointmentID=ddkdjdjdhjdvd_jkj`;
      let imgPath = await generate(qrcodeData);
      //send email to client
      sendEmailAppoinement(imgPath, req.body.appointmentType, {
        email: req.user.email,
        name: req.body.info.name,
        date: req.body.reservationTime,
      });

      return res.status(201);
    } catch (err) {
      console.log("error in ading", err);
    }
  },
  getAll: async (req, res) => {
    try {
      const appointments = await Appoinement.find()
        .populate("user_id", "name")
        .sort({ _id: -1 });

      return res.json(await appointments);
    } catch (err) {
      console.log(err);
      return res.status(401).json({ messge: "error in getinga appoinement" });
    }
  },
};

export default Action;
