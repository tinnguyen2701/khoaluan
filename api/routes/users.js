/* eslint-disable */
const userRouter = require('express').Router();
const User = require('../models/users');
const logger = require('../utils/logger');

userRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({
    username,
    password,
  });
  await newUser
    .save()
    .then(result => {
      return res.status(200).send({ username });
    })
    .catch(err => {
      logger.logError(err);
      return res.status(500).send('Dataproxy went wrong when register user');
    });
});

userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

  await User.findOne({ username })
    .then(result => {
      if (result.password !== password) {
        return res.status(403).send({ username });
      } else return res.status(200).send({ username });
    })
    .catch(err => {
      logger.logError(err);
      return res.status(500).send('Dataproxy went wrong when login user');
    });
});

module.exports = userRouter;
