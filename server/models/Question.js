import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  text: String,
  order: Number,
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }]
});

export default mongoose.model('Question', Schema);
