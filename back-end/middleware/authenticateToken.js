const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization"); // Get the Authorization header
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token." });
    }
    req.user = user; // Attach user data from the token to the request
    next(); // Continue to the next middleware or route
  });
};

module.exports = authenticateToken;
