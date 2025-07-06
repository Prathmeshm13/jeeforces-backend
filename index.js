const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });

const Question = require('./models/question');

app.get('/daily-questions', (req, res) => {
  // For now, send first 10 items from seed
  Question.find().limit(10).select('-correctOption').then(questions => {
    res.json(questions);
  });
});

app.post('/submit-answers', (req, res) => {
  const answers = req.body; // expect [{ questionId, chosenOption }]
  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  // Mock scoring: random value for now
  const score = Math.floor(Math.random() * (answers.length + 1));
  res.json({ score });
});


app.get("/", (req, res) => {
  res.send("Server is running");
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
