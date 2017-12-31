import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  answer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },
  survey: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey' },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  text: String
});

export default mongoose.model('SurveyAnswer', Schema);
