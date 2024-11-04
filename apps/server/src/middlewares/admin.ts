
import jwt from "jsonwebtoken";

//@ts-ignore
export function isAdminAuthenticated(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET! || "ankit",)
    //@ts-ignore
        req.id = decoded.id;
        next();
  } 
  else {
    res.status(403).json({ message: "No token provided" });
  }
}