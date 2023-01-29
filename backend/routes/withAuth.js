require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;


function withAuth(req, res, next) {
  const token = req.headers["authorization"];
  if (token === null || token === undefined) {
      return res.status(401).json({ message: "Token not provided" });
    }  
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) {
        res.status(401).json({ msg: "Bad token" });
      }
      req.body.id = decoded.id;
      next();
    });
  }

    module.exports = withAuth;

    