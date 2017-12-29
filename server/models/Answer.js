import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  text: String,
  order: Number,
  question: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

export default mongoose.model('Answer', Schema);
