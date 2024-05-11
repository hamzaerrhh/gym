// Middleware for requiring authentication and checking user role
import User from "../models/user.js";
import jwt from "jsonwebtoken";
export const requireAuth = async (req, res, next) => {
  console.log("start require auth");
  const token = req.cookies.token;
  console.log(req);
  console.log(token);

  if (token) {
    try {
      // Verify token
      console.log("start getting");
      console.log(process.env.JWT_PASS);

      const { id } = jwt.verify(token, process.env.JWT_PASS);

      // Find user
      const user = await User.findOne({ _id: id });
      console.log(user);

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Attach user to request object for later use if needed
      req.user = user;

      // Move to the next middleware
      console.log("the auth user done now move to next");
      next();
    } catch (error) {
      // Handle token verification errors
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(403).json({ message: "You should login firstly" });
  }
};

// Middleware for requiring coach role
export const requireCoach = (req, res, next) => {
  if (req.user && req.user.role === "coach") {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized: Insufficient role" });
  }
};

// Middleware for requiring admin role
export const requireAdmin = (req, res, next) => {
  console.log("start req admin now");
  console.log(req.user);
  if (req.user && req.user.role === "admin") {
    console.log("true");

    next();
  } else {
    return res.status(403).json({ message: "Unauthorized: Insufficient role" });
  }
};

export default { requireAuth, requireCoach, requireAdmin };
