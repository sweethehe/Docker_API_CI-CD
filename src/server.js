const express = require("express");
const { pool, redis } = require("./db");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/health", async (req, res) => {
  const health = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || "unknown",
  };
  try {
    // Test connexion PostgreSQL
    await pool.query("SELECT 1");
    health.database = "connected";
  } catch (e) {
    health.status = "unhealthy";
    health.database = "disconnected";
  }
  try {
    // Test connexion Redis
    await redis.ping();
    health.cache = "connected";
  } catch (e) {
    health.status = "unhealthy";
    health.cache = "disconnected";
  }
  const code = health.status === "healthy" ? 200 : 503;
  res.status(code).json(health);
});

const tasksRoutes = require("./routes/tasks");

app.use("/api/tasks", tasksRoutes);

app.listen(PORT, () => {
  console.log(`L'API est démarrée et écoute sur le port ${PORT}`);
});
