import Club from "../models/clubs.js";

const Action = {
  add: async (req, res) => {
    console.log("start");
    console.log(req.body.clubData);

    try {
      const data = req.body.clubData;
      console.log(data.image);
      const club = new Club({
        name: data.name,
        description: data.description,
        timeline: data.timeline,
        prix: data.prix,
        image: data.image,
        category: data.category,
        sport: data.sport,
      });
      await club.save();
      return res.status(201).json(club);
    } catch (err) {
      console.log("Error in adding club action;3", err);
    }
  },
  getAll: async (req, res) => {
    try {
      res.status(201).json(await Club.find().sort({ _id: -1 }));
    } catch (err) {
      console.log(err);
    }
  },
  delet: async (req, res) => {},
};
export default Action;
