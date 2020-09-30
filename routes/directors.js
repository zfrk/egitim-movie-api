const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

// Directors Model

const Directors = require('../models/Directors');

router.get('/:director_id', (req, res, next) => {
  // const promise = Directors.findById(req.params.director_id);

  const promise = Directors.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.director_id),
      },
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'directory_id',
        as: 'movies',
      },
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio',
        },
        movies: {
          $push: '$movies',
        },
      },
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies: '$movies',
      },
    },
  ]);

  promise
    .then((director) => {
      if (!director) {
        next({
          message: 'The director was not found',
          code: 21,
        });
      } else res.json(director);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/', (req, res, next) => {
  //  const promise = Directors.find();

  const promise = Directors.aggregate([
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'directory_id',
        as: 'movies',
      },
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio',
        },
        movies: {
          $push: '$movies',
        },
      },
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies: '$movies',
      },
    },
  ]);

  promise
    .then((directors) => {
      if (!directors) {
        next({
          message: 'There is no directory',
          code: 20,
        });
      }
      res.json(directors);
    })
    .catch((err) => {
      console.log(err);
      res.data(err);
    });
});

router.delete('/:director_id', (req, res, next) => {
  const promise = Directors.findByIdAndRemove(req.params.director_id);

  promise
    .then((director) => {
      if (!director) {
        next({
          message: 'There is no directory for delete ',
          code: 22,
        });
      } else res.json(director);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post('/', (req, res) => {
  const directors = new Directors(req.body);

  const promise = directors.save();

  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
