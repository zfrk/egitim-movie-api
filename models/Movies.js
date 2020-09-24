const mongoose = require('mongoose');

const { Schema } = mongoose;

const MovieSchema = new Schema({
  directory_id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  category: String,
  country: String,
  year: Number,
  imdb_score: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('movie', MovieSchema);
