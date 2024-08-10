import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function authenticateUser(req, res, next) {
  try {

    const token = req.cookies.token;
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }



  // jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, user) => {
  //   console.log(err);
  const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);
  req.user = await User.findById(decoded.id).select('-password');


  // if (err) {
  //   console.log("Token verification error:", err);
  //   return res.status(403).json({ message: "Token is not valid" });
  // }
  // req.user = user;
  if (!req.user) {
    return res.status(401).json({ message: "User not found, authorization denied" });
}



  next();
    
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
    

    
  }
  

};

export default authenticateUser;