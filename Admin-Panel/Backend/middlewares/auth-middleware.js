import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();
export const checkLoginStatus = (req, res, next) => {
  try {
    // 1️⃣ Cookie se token lo
    const token = req.cookies?.auth_token;

    // 2️⃣ Token nahi mila
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Please login first"
      });
    }

    // 3️⃣ Token verify karo
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // 4️⃣ User ko request me attach karo
    req.user = decoded;

    next(); // ✅ VERY IMPORTANT
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token"
    });
  }
};
