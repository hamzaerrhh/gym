import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import generateToken from "../function/index.js";
import { SendConfirmationEmail } from "../helper/mailer.js";
const Admin = {
  add: async (req, res) => {
    console.log("start adding user");
    console.log(req.body.username);
    //the same exept modify role
    const { username, email, password } = req.body;

    //check if the data send corect
    if (!username || !email || !password) {
      console.log("messing field");
      return res.status(400).send({ message: "Missing fields" });
    }
    try {
      //check if user already register
      const user = await User.findOne({
        $or: [{ email: email }, { username: username }],
      });
      console.log("finding user done");

      if (user) {
        if (user.email === email) {
          // Email is already taken
          return res.status(400).json({ message: "Email is already taken" });
        } else {
          // Username is already taken
          return res.status(400).json({ message: "Username is already taken" });
        }
      }
      //hashed the password and the verifyToken
      ////hash pass
      console.log("user not found ");

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      ////verifytoken
      const tokenVerification = generateToken(10);
      console.log("start registration");

      //register user
      const newUser = new User({
        username: username,
        password: hashedPassword,
        email: email,
        verifyToken: tokenVerification,
        role: "admin",
      });
      await newUser.save();
      //send emai verification
      SendConfirmationEmail("register", newUser.email, newUser.verifyToken);
      console.log("registration done");
      return res.status(201).json({ message: "user register" });
    } catch (err) {
      console.log("error in registration");
      res.status(501).json({ message: "error in registration " });
    }
  },
  get: async (req, res) => {
    const role = req.params.role;
    try {
      if (
        role != "user" &&
        role != "coach" &&
        role != "admin" &&
        role != "all"
      ) {
        return res.status(401).json({ message: "no such role" });
      }
      if (role === "all") {
        let users = await User.find().select("-password -__v");
        return res.status(200).json(users);
      }

      let users = await User.find({ role: role }).select("-password -__v");
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: "error" });
    }
  },
  editRole: async (req, res) => {
    try {
      const id = req.params.id;
      const role = req.body.role;
      console.log(id, role);

      try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        user.role = role;
        await user.save();

        return res
          .status(200)
          .json({ message: "User role updated successfully" });
      } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
    } catch (err) {
      console.error("Error:", err);
      return res.status(400).json({ message: "Bad request" });
    }
  },
  addGG: async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      console.log("messing field");
      return res.status(400).send({ message: "Missing fields" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    try {
      const newUser = new User({
        username: username,
        password: hashedPassword,
        email: email,
        virified: true,
        role: "admin",
      });
      await newUser.save();
    } catch (err) {
      console.log(err);
    }
  },
};

export default Admin;
