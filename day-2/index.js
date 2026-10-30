const express = require('express');
require('dotenv').config();

const { db, testConnection } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────────────

// Health check
app.get('/', (req, res) => {
  res.json({ message: '🚀 Node.js + MySQL App is running!', status: 'OK' });
});

// GET all users
app.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET a single user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create a new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'name and email are required' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(201).json({ success: true, insertedId: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, message: `User ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Bootstrap ────────────────────────────────────────────────────────────

async function start() {
  await testConnection();          // verify DB is reachable
  await initDB();                  // create table if not exists

  app.listen(PORT, () => {
    console.log(`🌐 Server listening on http://localhost:${PORT}`);
  });
}

// Create the users table if it doesn't already exist
async function initDB() {
  const createTable = `
    CREATE TABLE IF NOT EXISTS users (
      id    INT AUTO_INCREMENT PRIMARY KEY,
      name  VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await db.query(createTable);
  console.log('✅ Table "users" is ready.');
}

start().catch((err) => {
  console.error('Fatal error during startup:', err);
  process.exit(1);
});
