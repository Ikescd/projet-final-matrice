require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;


function authMiddleware(req, res, next) {
  const token = req.headers["Authorization"];
  if (token === null || token === undefined) {
      return res.status(401).json({ message: "Token not provided" });
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }

    module.exports = authMiddleware;

    