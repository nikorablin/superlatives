import mongoose from 'mongoose';

const SurveySchema = new mongoose.Schema({
  name: String,
  created: Date
});

export default mongoose.model('Survey', SurveySchema);
