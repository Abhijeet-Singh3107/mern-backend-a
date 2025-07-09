import jwt from "jsonwebtoken";
const SECRET = "secret";
//  --> Middleware: Authenticate
const authenticate = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ message: "No token present" });
  }

  token = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// -->  Middleware: Authorize
const authorize = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      return res.status(403).json({ message: "Unauthorized Access" });
    }
  };
};

export {authenticate,authorize};
