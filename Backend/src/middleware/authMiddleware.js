const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ msg: "Access Denied! Login First !!!" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    const verifiedToken = jwt.verify(token, "my-secret-key");

    req.user = verifiedToken; 
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Bad Authorization Token or Expired" });
  }
};

module.exports = authMiddleware;
