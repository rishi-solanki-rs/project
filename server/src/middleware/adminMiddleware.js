const jwt = require("jsonwebtoken");
const User = require("../models/user");


const adminMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Token Error");

    const payload = jwt.verify(token, process.env.JWT_KEY);

    const { _id } = payload;
    if (!_id) throw new Error("Id is Missing");

    const result = await User.findById(_id);

    console.log("Decoded JWT payload:", payload);
    if (!result) throw new Error("User doesn't exist");
    
    if (isBlocked) throw new Error("Invalid Token");

    req.result = result;

    next();
  } catch (err) {
    res.status(401).send("Error Occured 2 :" + err);
  }
};
module.exports = adminMiddleware;
