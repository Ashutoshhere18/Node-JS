import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

export const checkLoginStatus = (req, res, next) => {
  try {
    // 1. Token cookie se lo
    const token = req.cookies.auth_token;

    // 2. Token nahi mila
    if (!token) {
      return res.status(401).json({
        message: "Please login first"
      });
    }

    // 3. Token verify karo
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // 4. User data request me daal do
    req.user = decoded;

    // 5. Sab sahi → next API chale
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};
