const mongoose = require('mongoose');

const { Schema } = mongoose;

const MovieSchema = new Schema({
  directory_id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: [true, ' {PATH} alan� zorunludur!'],
    maxlength: [
      15,
      ' {PATH} alan� {VALUE}, {MAXLENGTH} karakterden k���k olmal�!',
    ],
    minlength: [
      3,
      ' {PATH} alan� {VALUE}, {MINLENGTH} karakterden b�y�k olmal�!',
    ],
  },
  category: String,
  country: String,
  year: {
    type: Number,
    default: Date.now.year,
    max: 2040,
    min: 1900,
  },
  imdb_score: Number,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('movie', MovieSchema);
