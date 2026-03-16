const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const connectDatabase = require("./config/connectDatabase");
const userRouter = require("./routes/userRoute");

dotenv.config({ path: path.join(__dirname, "config/config.env") });

connectDatabase();

const app = express(); 

// Middleware - ORDER MATTERS!
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, // This allows cookies to be sent/received
  optionsSuccessStatus: 200
}));

// Routes
app.use("/api/user", userRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    success: true, 
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ 
    success: false,
    message: "Internal server error" 
  });
});

const port = process.env.PORT || 3597;
const node = process.env.NODE_ENV;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port} in ${node} mode`);
});