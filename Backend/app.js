const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const planRoutes = require("./routes/plan.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/plan", planRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the StudySync backend");
});

// Error handler middleware
app.use(errorHandler);

module.exports = app;
