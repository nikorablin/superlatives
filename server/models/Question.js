import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: String,
  order: { type: Number, default: 0 },
  type: String,
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }]
});

const model = mongoose.model('Question', Schema);

Schema.pre('save', function(next) {
  if (!this.order || this.order === 0) {
    model.findOne({}).sort('-order').then(item => {
      if (item === null) {
        this.order = 0;
        next();
      }
      this.order = item.order + 1;
      next();
    });
  } else {
    next();
  }
});

export default model;
