const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const { generateMagicLinkToken, generateSessionToken, setSessionCookie } = require("../utils/generateToken");

// STEP 1: User requests login - Generate MAGIC LINK token (1 min expiry)
exports.login = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false,
        message: "Email is required" 
      });
    }

    // Find or create user
    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({
        email,
        username: email.split("@")[0],
        createdAt: new Date()
      });
    }

    // Generate MAGIC LINK token (expires in 1 minute)
    const magicToken = generateMagicLinkToken(user._id);

    // Create magic link
    const link = `http://localhost:3000/login-success?token=${magicToken}`;

    // Send email with magic link
    await sendEmail(email, link);

    return res.status(200).json({
      success: true,
      message: "Magic link sent to your email. It expires in 1 minute.",
      // Only send token in development for testing
      ...(process.env.NODE_ENV === 'development' && { token: magicToken }),
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to send login link" 
    });
  }
};

// STEP 2: User clicks magic link - Verify and create SESSION token (7 days expiry)
exports.verify = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ 
        success: false,
        message: "Token missing" 
      });
    }

    // Verify the magic link token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ 
          success: false,
          message: "Magic link expired. Please request a new one.",
          expired: true 
        });
      }
      return res.status(401).json({ 
        success: false,
        message: "Invalid magic link" 
      });
    }

    // Check if it's a magic link token
    if (decoded.purpose !== 'magic-link') {
      return res.status(401).json({ 
        success: false,
        message: "Invalid token type" 
      });
    }

    // Find user
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Update user verification status
    user.isVerified = true;
    user.lastLogin = new Date();
    await user.save();

    // Generate SESSION token (expires in 7 days)
    const sessionToken = generateSessionToken(user._id);
    
    // Set session cookie
    setSessionCookie(res, sessionToken);

    // Also send token in response for localStorage
    res.json({
      success: true,
      message: "Login successful",
      token: sessionToken, // This is the 7-day session token
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ 
      success: false,
      message: "Verification failed" 
    });
  }
};

// STEP 3: Logout - Clear session
exports.logout = async (req, res) => {
  try {
    // Clear session cookie
    res.clearCookie('session');
    res.clearCookie('jwt');
    
    res.status(200).json({ 
      success: true,
      message: "Logged out successfully" 
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ 
      success: false,
      message: "Logout failed" 
    });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select('-__v');
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch profile" 
    });
  }
};