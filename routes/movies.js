// eslint-disable-next-line import/newline-after-import
const express = require('express');
const router = express.Router();

// Models

const Movies = require('../models/Movies');

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  const promise = Movies.find();
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/:movie_id', (req, res, next) => {
  const promise = Movies.findById(req.params.movie_id);

  promise
    .then((movie) => {
      if (!movie) {
        next({
          message: 'The movie was not found',
          code: '5',
        });
      } else res.json(movie);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// eslint-disable-next-line no-unused-vars
router.post('/', (req, res, next) => {
  // const { title, imdb_score, category, country, year } = req.body;
  const movie = new Movies(req.body);

  // movie.save((err, data) => {
  //   if (err) res.json(err);

  //   res.json(data);
  // });
  const promise = movie.save();
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
