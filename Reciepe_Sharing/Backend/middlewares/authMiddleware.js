import jwt from "jsonwebtoken";

// Check if user logged in
export const protect = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;   // attaching user info
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};


// Role based access
export const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};