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
      SendConfirmationEmail("register", newUser.email, newUser.verifyToken);
      console.log("registration done");
      return res.status(201).json({ message: "user register" });
    } catch (err) {
      console.log("error in registration");
      res.status(501).json({ message: "error in registration " });
    }
  },
  login: async (req, res) => {
    console.log("start login");
    console.log(req.body);
    const { email, password } = req.body;
    //verify the data entry
    if (!email || !password) {
      console.log("missing filed");

      return res.status(400).send({ message: "missing filed" });
    }
    try {
      //verify if the user exisste
      const user = await User.findOne({ email: email });
      if (!user) {
        console.log(" user not found");

        return res.status(400).json({ message: "user not found" });
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

      const token = jwt.sign({ id: user._id }, process.env.JWT_PASS, {
        expiresIn: "1d",
      });
      console.log(token);

      const option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 10000),
        httpOnly: true,
      };
      console.log("the login done");

      return res
        .status(201)
        .cookie("token", token, option)
        .json({ success: true, token, user });
      //send the data to front-end and token
    } catch (err) {
      return res.status(400).json({ message: "bad request", msg: err });
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

      return res.status(201).send({ message: "the activation done" });
      //redirect him to login page
    } catch (err) {
      console.log("ther is a error");
    }
  },
  forgetPass: async (req, res) => {
    //check forgetToken if not exist
    console.log("start forget pass", req.body);
    const email = req.body;
    //find the user
    const user = await User.findOne(email);
    if (!user) {
      console.log("no  user found");
      return res.status(401).json({ message: "this email dosen't exist" });
    }
    ////generate forget token
    user.forgetToken = generateToken(20);
    await user.save();
    //send it to email
    SendConfirmationEmail("forget", user.email, user.forgetToken);
    return res.status(201).send({ message: "the email sent" });
  },
  resetPass: async (req, res) => {
    //get the token,pass

    const { pass, confirm } = req.body;
    const { forgetToken } = req.params;
    console.log(forgetToken, "token");
    console.log(pass, confirm);

    if (pass != confirm) {
      return res.status(401).json({ message: "incorect entry" });
    }
    //verify if token exist
    try {
      const user = await User.findOne({ forgetToken: forgetToken });
      if (!user) {
        console.log("non valide user");
        return res.status(406).json({ message: "your link expired" });
      }
      console.log("valide user");

      //refresh token and edit the pass
      user.forgetToken = null;
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(pass, salt);
      user.password = hashedPassword;
      await user.save();
      return res.status(201).send({ messsage: "the reset done" });
    } catch (err) {
      res.status(500).json({ message: "server error" });
    }

    //redirect to home
  },
};
export default auth;
