// eslint-disable-next-line import/newline-after-import
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Models

const User = require('../models/Users');

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// eslint-disable-next-line no-unused-vars
router.post('/register', (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    const user = User({
      username,
      password: hash,
    });

    const promise = user.save();

    promise
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

router.post('/authenticate', (req, res) => {
  const { username, password } = req.body;

  User.findOne(
    {
      username,
    },
    (err, user) => {
      if (err) throw err;

      if (!user) {
        res.json({
          status: false,
          messages: 'Authentication failed, user not found.',
        });
      } else {
        bcrypt.compare(password, user.password).then((result) => {
          if (!result) {
            res.json({
              status: false,
              messages: 'Authentication failed, wrong password',
            });
          } else {
            const payload = {
              username,
            };

            const token = jwt.sign(payload, req.app.get('api_secret_key'), {
              expiresIn: 720,
            });

            res.json({
              status: true,
              token,
            });
          }
        });
      }
    }
  );
});

module.exports = router;
