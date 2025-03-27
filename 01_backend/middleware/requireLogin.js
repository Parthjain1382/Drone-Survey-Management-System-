import jwt from "jsonwebtoken";
import User from "../model/user.js";

const requireLogin = async (req, res, next) => {
  try {
      const { authorization } = req.headers;

      if (!authorization) {
          return res.status(401).json({ error: "You are not logged in" });
      }

      const token = authorization.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch full user data, including role
      const user = await User.findById(decoded.id).select("-password"); 

      if (!user) {
          return res.status(401).json({ error: "User not found" });
      }

      req.user = user; // Attach the full user object
      next();
  } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
  }
};

export default requireLogin;
