
import jwt from "jsonwebtoken";

//@ts-ignore
export function isUserAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "ankit");
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
    } else {
      res.status(400).json({ message: "No token provided" });
    }
  }
  