const express = require("express");
const { json } = require("express");
const pwnedRoutes = require("./routes/pwnedRoutes");
const authRoutes = require("./routes/authRoutes");
const authenticateToken = require("./middleware/authMiddleware");

const app = express();

// Middlewares
app.use(json());

// Routes
app.use("/auth", authRoutes);
app.use("/pwned", authenticateToken, pwnedRoutes);

// Test route with authentication middleware
app.get("/test", authenticateToken, (req, res) => {
  res.json({ message: "Authenticated!", user: req.user });
});

module.exports = app;
