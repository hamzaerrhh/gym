import Event from "../models/event.js";
const Action = {
  add: async (req, res) => {
    try {
      const data = req.body.formData;
      console.log(data);

      const newEvent = Event({
        title: data.title,
        descreption: data.description,
        dateTimeStarted: data.dateTimeStarted,
        dateTimeEnd: data.dateTimeEnd,
        localisation: data.localisation,
        image: data.image,
      });
      await newEvent.save();
      return res.status(201).json(newEvent);
    } catch (err) {
      console.log(err);
      return res.status(501).json({ messgae: err });
    }
  },
  getAll: async (req, res) => {
    try {
      const events = await Event.find();
      return res.status(201).send(events);
    } catch (err) {
      console.log(err);
      res.status(501).json({ message: "error" });
    }
  },
};
export default Action;
