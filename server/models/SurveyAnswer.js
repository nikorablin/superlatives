import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  answer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  survey: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Survey' }]
});

export default mongoose.model('SurveyAnswer', Schema);
