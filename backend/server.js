const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "database",
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || "taskdb",
  user: process.env.DB_USER || "taskuser",
  password: process.env.DB_PASS || "taskpass"
});

const mockTasks = [
  {
    id: 1,
    title: "Przygotować Artefakt 4",
    description: "Połączyć frontend z backendem przez API",
    status: "todo"
  },
  {
    id: 2,
    title: "Zaktualizować README",
    description: "Dodać ścieżkę testowania endpointu API",
    status: "done"
  },
  {
    id: 3,
    title: "Uruchomić aplikację w Dockerze",
    description: "Zweryfikować działanie pod localhost:8080/tasks",
    status: "todo"
  }
];

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    res.status(200).json({
      status: "ok",
      database: "fallback",
      message: "Aplikacja działa, ale baza nie odpowiada"
    });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, description, status FROM tasks ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.warn("DB unavailable, returning mock tasks:", error.message);
    res.json(mockTasks);
  }
});

app.listen(PORT, () => {
  console.log(`Backend API running on ${PORT}`);
});