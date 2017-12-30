import mongoose from 'mongoose';

const SurveySchema = new mongoose.Schema({
  name: String,
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Survey', SurveySchema);
