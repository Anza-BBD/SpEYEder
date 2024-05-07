const express = require("express");
const { json } = require("express");
const pwnedRoutes = require("./routes/pwnedRoutes");
const authRoutes = require("./routes/authRoutes");
const detailsRoutes = require("./routes/detailsRoutes");
const authenticateSession = require("./middleware/authMiddleware");
const { frontendUrl } = require("./config");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(json());
app.use(cookieParser());

const corsOptions = {
  origin: frontendUrl,
  credentials: true, // to allow cookies to be sent
};
app.use(cors(corsOptions));

// Routes
app.use("/auth", authRoutes);
app.use("/pwned", authenticateSession, pwnedRoutes);
app.use("/details", authenticateSession, detailsRoutes);

// Test route with authentication middleware
app.get("/test", authenticateSession, (req, res) => {
  res.json({ message: "Authenticated!", user: req.user });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "best api eu" });
});

module.exports = app;
