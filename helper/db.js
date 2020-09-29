const mongoose = require('mongoose');

module.exports = () => {
  mongoose
    .connect(
      'mongodb+srv://zfr:Qwer1234@cluster0.zpq6x.mongodb.net/egitim-movie_api?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      mongoose.set('useFindAndModify', false);
      console.log('MongoDB Connected1');
    })
    .catch((err) => console.log(`MongoDB Error1 ${err}`));

  mongoose.connection.on('open', () => {
    console.log('MongoDB Connected2');
  });
  mongoose.connection.on('error', (err) => {
    console.log(`MongoDB Error2 ${err}`);
  });

  mongoose.Promise = global.Promise;
};
