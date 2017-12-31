import express from 'express';
import path from 'path';
import http from 'http';
import mongoose from 'mongoose'
import bodyParser from 'body-parser';

import { Answer, Question, Survey, SurveyAnswer } from './models';

const app = express();

const DB_URL = process.env.MONGODB_URI ||
  'mongodb://heroku_v3g7j2bg:p85se5ft6iib2cjobm5ubuu5qr@ds235807.mlab.com:35807/heroku_v3g7j2bg';

mongoose.connect(DB_URL, (err, res) => {
  if (err) {
    console.log ('ERROR connecting to: ' + DB_URL + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + DB_URL);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.post('/api/init', (req, res) => {
  Survey.create({ name: req.body.name, _id: new mongoose.Types.ObjectId() }).then(survey => {
    res.json({ id: survey.id });
  })
});

app.post('/api/answer', (req, res) => {
  SurveyAnswer.create({
    answer: req.body.answerId,
    survey: req.body.surveyId,
    text: req.body.text
  }).then(response => {
    res.json({ success: true });
  })
});

app.get('/api/start', (req, res) => {
  Question.find({}).populate('answers').sort('order').then(questions => {
    res.json(questions);
  });
});

app.get('/api/results', (req, res) => {
  res.json({});
});

app.post('/api/question/new', (req, res) => {
  const questionId = new mongoose.Types.ObjectId();
  const answers = req.body.answers.map(() => new mongoose.Types.ObjectId());
  Question.create({ _id: questionId, answers, text: req.body.text, type: req.body.type });
  Promise.all(
    req.body.answers.map((answer, order) =>
      Answer.create({ _id: answers[order], text: answer.text, question: questionId, order })
    )
  ).then(() => res.json({ success: true }));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;
