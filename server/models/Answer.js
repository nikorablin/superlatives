import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: String,
  order: { type: Number, default: 0 },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }
});

export default mongoose.model('Answer', Schema);
