// eslint-disable-next-line import/newline-after-import
const express = require('express');
const router = express.Router();

// Models

const Movies = require('../models/Movies');
// const { route } = require('./index');

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

router.get('/top10', (req, res, next) => {
  const promise = Movies.find({}).limit(10).sort({ imdb_score: -1 });

  promise
    .then((data) => {
      if (!data) {
        next({
          message: 'There is no movie',
          code: 8,
        });
      }
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

router.put('/:movie_id', (req, res, next) => {
  const promise = Movies.findByIdAndUpdate(req.params.movie_id, req.body, {
    new: true,
  });

  promise
    .then((movie) => {
      if (!movie) {
        next({
          message: 'The movie was not found and updated',
          code: '6',
        });
      } else res.json(movie);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:movie_id', (req, res, next) => {
  const promise = Movies.findByIdAndRemove(req.params.movie_id);

  promise
    .then((movie) => {
      if (!movie) {
        next({
          message: 'The movie was not found and deleted',
          code: 7,
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

// Between

router.get('/between/:start_year/:end_year', (req, res, next) => {
  const { start_year: startYear, end_year: endYyear } = req.params;
  const promise = Movies.find({
    year: { $gte: parseInt(startYear, 10), $lte: parseInt(endYyear, 10) },
  }).sort({ imdb_score: -1 });

  promise
    .then((movie) => {
      if (!movie || (Array.isArray(movie) && !movie.length)) {
        next({ message: 'There is no movie between this years', code: 10 });
      } else res.json(movie);
    })
    .catch((err) => {
      console.log(err);
      req.data(err);
    });
});

module.exports = router;
