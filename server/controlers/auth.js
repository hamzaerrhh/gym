import User from "../models/user";
import bcryptjs from "bcryptjs";
import { SendConfirmationEmail } from "../helper/mailer";

function generateToken(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

const auth = {
  register: async (req, res) => {
    console.log("start registation");
    console.log(req.body);
    const { username, email, password } = req.body;

    //check if the data send corect
    if (!username || !email || !password)
      return res.status(400).send({ error: "Missing fields" });
    try {
      //check if user already register
      const user = await User.findOne({ email });
      if (user) return res.status(400).send({ error: "User already exists." });
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
      SendConfirmationEmail("register", newUser.email, tokenVerification);
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
    if (!email || !password)
      return res.status(400).send({ error: "missing filed" });
    try {
      //verify if the user exisste
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ mesg: "user not found" });
      }
      //verify the password
      const isValidPassword = await bcryptjs.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      //verify if verify
      if (user.verify == false) {
        return res.status(401).json({ message: "Please confirm your account" });
      }
      //start jwt
      console.log("start jwt");
      const token = jwt.sign(
        { id: user._id, email: user.email, username: user.username },
        "hamza",
        { expiresIn: "1d" }
      );
      const option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
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
    console.log("start verification");
    //get the tokenVerification from urlparams
    const { tokenVerification } = req.params.verifyToken;
    console.log(verifyToken);
    try {
      //search from data base
      console.log("start finding user");
      const user = await User.findOne({ verifyToken: verifyToken });

      //check if exist
      if (!user) {
        console.log("no user found");

        return res.status(401).send({ message: "the user doesn't exist" });
      }

      //clear  the tokenVerification in database and change isverify
      user.verifyToken = null;
      user.isVerified = true;
      await user.save();

      return res.status(201).send({ msg: "the activation done" });
      //redirect him to login page
    } catch (err) {
      console.log("ther is a error");
    }
  },
  forgetpassword: async (req, res) => {
    //check forgetToken if not exist
    //send it to email
  },
  editPass: async (req, res) => {
    //get the token,pass
    //refresh token and edit the pass
    //redirect to home
  },
};
