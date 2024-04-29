// Middleware for requiring authentication and checking user role
import User from "../models/user";
const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      // Verify token
      const { id } = jwt.verify(token, process.env.JWT_PASS);

      // Find user
      const user = await User.findOne({ _id: id });

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

// Middleware for requiring coach role
const requireCoach = (req, res, next) => {
  if (req.user && req.user.role === "coach") {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized: Insufficient role" });
  }
};

// Middleware for requiring admin role
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized: Insufficient role" });
  }
};

export default { requireAuth, requireCoach, requireAdmin };
