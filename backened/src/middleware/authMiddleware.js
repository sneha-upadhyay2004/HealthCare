import User from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const user = await User.findOne({ token });
    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Authentication failed", error: err.message });
  }
};