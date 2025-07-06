const mongoose = require('mongoose');
const Question = require('./models/question');
const data = require('./questions.json'); // your 100-question JSON

require('dotenv').config(); 

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(async () => {
  await Question.deleteMany({});
  await Question.insertMany(data);
  console.log('Seed complete');
  process.exit();
});
