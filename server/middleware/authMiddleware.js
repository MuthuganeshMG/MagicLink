const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header
    let token = req.headers.authorization?.split(" ")[1];
    
    // If not in header, try to get from cookie
    if (!token && req.cookies.session) {
      token = req.cookies.session;
    }
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "Unauthorized - No token provided" 
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ 
          success: false,
          message: "Session expired. Please login again.",
          expired: true 
        });
      }
      return res.status(401).json({ 
        success: false,
        message: "Invalid token" 
      });
    }

    // Check if it's a session token (for protected routes)
    if (decoded.type !== 'session') {
      return res.status(401).json({ 
        success: false,
        message: "Invalid token type" 
      });
    }

    // Get user from database
    const user = await userModel.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Attach user to request object
    req.user = { 
      _id: user._id,
      email: user.email,
      username: user.username
    };
    
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ 
      success: false,
      message: "Authentication failed" 
    });
  }
};

module.exports = authMiddleware;