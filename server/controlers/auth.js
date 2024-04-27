import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { SendConfirmationEmail } from "../helper/mailer.js";
import jwt from "jsonwebtoken";

function generateToken(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}
function getIdFromToken(token) {
  const decodedToken = jwt.verify(token, process.env.JWT_PASS);
  return decodedToken._id;
}

const auth = {
  register: async (req, res) => {
    console.log("start registation");
    console.log(req.body);
    const { username, email, password } = req.body.formdata;

    //check if the data send corect
    if (!username || !email || !password) {
      console.log("messing field");
      return res.status(400).send({ error: "Missing fields" });
    }
    try {
      //check if user already register
      const user = await User.findOne({ email: email });
      console.log("finding user done");
      if (user) {
        console.log("user found");

        return res.status(400).send({ error: "User already exists." });
      }
      //hashed the password and the verifyToken
      ////hash pass
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      ////verifytoken
      const tokenVerification = generateToken(10);

      //register user
      const newUser = new User({
        username: username,
        password: hashedPassword,
        email: email,
        verifyToken: tokenVerification,
      });
      await newUser.save();
      //send emai verification
      SendConfirmationEmail(newUser.email, newUser.verifyToken);
      console.log("registration done");
      return res.status(201).json({ msg: "user register" });
    } catch (err) {
      console.log("error in registration");
      res.status(501).send(err);
    }
  },
  login: async (req, res) => {
    console.log("start login");
    console.log(req.body);
    const { email, password } = req.body;
    //verify the data entry
    if (!email || !password) {
      console.log("missing filed");

      return res.status(400).send({ error: "missing filed" });
    }
    try {
      //verify if the user exisste
      const user = await User.findOne({ email: email });
      if (!user) {
        console.log(" user not found");

        return res.status(400).json({ mesg: "user not found" });
      }
      //verify the password
      const isValidPassword = await bcryptjs.compare(password, user.password);
      if (!isValidPassword) {
        console.log("not valid pass");
        return res.status(401).json({ message: "Incorrect password" });
      }
      //verify if verify
      if (user.virified == false) {
        console.log("nuser not verified");

        return res.status(401).json({ message: "Please confirm your account" });
      }
      //////////////////start confirme

      //start jwt
      console.log("user is verified ");

      console.log("start jwt");

      const token = jwt.sign(
        { id: user._id, email: user.email, username: user.username },
        process.env.JWT_PASS,
        { expiresIn: "1d" }
      );
      console.log(token);

      const option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 10000),
        httpOnly: true,
      };
      console.log("the login done");

      return res
        .status(201)
        .cookie("token", token, option)
        .json({ success: true, token });
      //send the data to front-end and token
    } catch (err) {
      return res.status(400).json({ error: "bad request", msg: err });
    }
  },
  verification: async (req, res) => {
    console.log("the params", req.params);
    console.log("start verification");
    //get the tokenVerification from urlparams
    const tokenVerification = req.params.tokenVerification;
    console.log(tokenVerification);
    try {
      //search from data base
      console.log("start finding user");
      console.log("the token verification", tokenVerification);

      const user = await User.findOne({ verifyToken: tokenVerification });

      //check if exist
      if (!user) {
        console.log("no user found");
        return res.status(401).send({ message: "the user doesn't exist" });
      }

      //clear  the tokenVerification in database and change isverify
      user.verifyToken = null;
      user.virified = true;
      await user.save();

      return res.status(201).send({ msg: "the activation done" });
      //redirect him to login page
    } catch (err) {
      console.log("ther is a error");
    }
  },
  forgetPass: async (req, res) => {
    //check forgetToken if not exist
    //send it to email
  },
  resetPass: async (req, res) => {
    //get the token,pass
    //refresh token and edit the pass
    //redirect to home
  },
  logout: async (req, res) => {
    //find the user by token
    //refresh the token
  },
};
export default auth;