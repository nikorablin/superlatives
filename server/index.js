import express from 'express';
import path from 'path';
import http from 'http';
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import { TYPES } from './constants/QuestionTypes';

let root = path.join(__dirname, '..');
if (process.env.ENV === 'production') {
  root = `/app/`;
}

import { Answer, Question, Survey, SurveyAnswer } from './models';

const app = express();

const DB_URL = process.env.MONGODB_URI ||
  'mongodb://heroku_tw88z5d3:qb9nca790eln7itmtnn33is6et@ds133547.mlab.com:33547/heroku_tw88z5d3';

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
app.use(express.static(path.join(root, 'client/build')));

app.post('/api/init', (req, res) => {
  Survey.create({ name: req.body.name, _id: new mongoose.Types.ObjectId() }).then(survey => {
    res.json({ id: survey.id });
  })
});

app.post('/api/answer', (req, res) => {
  SurveyAnswer.create({
    answer: req.body.answerId,
    survey: req.body.surveyId,
    question: req.body.questionId,
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
  SurveyAnswer.find({})
  .populate('answer')
  .populate({
    path: 'question',
    populate: { path: 'answers' }
  }).then(answers => {
    const results = answers
      .filter(answer => answer.question.type === TYPES.RADIO)
      .reduce((map, surveyAnswer) => {
        if (!map[surveyAnswer.question._id]) {
          map[surveyAnswer.question._id] = {
            text: surveyAnswer.question.text,
            answers: surveyAnswer.question.answers.reduce((map, answer) => {
              map[answer._id] = {
                text: answer.text,
                count: 0
              }
              return map;
            }, {})
          }
        }
        map[surveyAnswer.question._id].answers[surveyAnswer.answer._id].count++;
        return map;
      }, {});
    const textResults = answers
      .filter(answer => answer.question.type === TYPES.TEXT)
      .reduce((map, surveyAnswer) => {
        if (!map[surveyAnswer.question._id]) {
          map[surveyAnswer.question._id] = { text: surveyAnswer.question.text, results: [] };
        }
        map[surveyAnswer.question._id].results.push(surveyAnswer.text);
        return map;
      }, {});
    res.json({ results, textResults });
  });
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
  res.sendFile(path.join(root, 'client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;
