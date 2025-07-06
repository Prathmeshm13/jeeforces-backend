const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctOption: String,
  subject: String,
  topic: String,
  difficulty: { type: String, enum: ['Easy','Medium','Hard'] },
  source: String
});

module.exports = mongoose.model('Question', QuestionSchema);
