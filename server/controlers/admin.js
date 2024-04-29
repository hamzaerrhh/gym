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
};

export default Admin;
