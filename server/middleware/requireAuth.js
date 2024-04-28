import User from "../models/user";
const requireAuth = async (req, res, next) => {
  console.log("start getting data");
  const token = req.cookies.token;
  console.log(token);

  if (token) {
    try {
      const { id } = jwt.verify(token, process.env.JWT_PASS);
      const user = await User.findOne({ _id: id }).select("_id");

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Attach user to request object for later use if needed
      req.user = user;

      // Move to the next middleware
      next();
    } catch (error) {
      // Handle token verification errors
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(403).json({ message: "You should login firstly" });
  }
};
