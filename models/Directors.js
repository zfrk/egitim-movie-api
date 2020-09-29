const mongoose = require('mongoose');

const { Schema } = mongoose;

const DirectorScheam = new Schema({
  name: String,
  surname: String,
  bio: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('director', DirectorScheam);
