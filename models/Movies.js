const mongoose = require('mongoose');

const { Schema } = mongoose;

const MovieSchema = new Schema({
  directory_id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: [true, ' {PATH} alan¹ zorunludur!'],
    maxlength: [
      15,
      ' {PATH} alan¹ {VALUE}, {MAXLENGTH} karakterden küçük olmal¹!',
    ],
    minlength: [
      3,
      ' {PATH} alan¹ {VALUE}, {MINLENGTH} karakterden büyük olmal¹!',
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
