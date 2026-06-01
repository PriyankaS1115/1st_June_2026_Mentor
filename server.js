require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const queryRoutes = require("./routes/queryRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/queries", queryRoutes);

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "../public")));

// Serve index.html for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const server = app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  console.error("Server failed to start:", err.message || err);
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Change PORT in .env or stop the process using it.`);
  }
  process.exit(1);
});
