// server.js
require('dotenv').config(); // Load env variables

const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

async function startServer() {
  let client;

  try {
    // Connect to MongoDB Atlas
    client = new MongoClient(MONGO_URI);
    await client.connect();

    // Set up database reference (optional)
    const db = client.db('socialMediaDB');

    // Route to confirm DB connection
    app.get('/', (req, res) => {
      res.json({ message: "Successfully connected to the database!" });
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Database connection failed:', err);

    // Fallback route in error mode
    app.get('/', (req, res) => {
      res.status(500).json({ message: "Failed to connect to the database." });
    });

    app.listen(PORT, () => {
      console.log(`⚠️ Server (error mode) is running on http://localhost:${PORT}`);
    });
  }
}

startServer();
