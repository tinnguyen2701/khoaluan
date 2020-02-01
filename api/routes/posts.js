/* eslint-disable */
const postRouter = require('express').Router();
const passport = require('passport');
const Overview = require('../models/overviews');
const Manual = require('../models/manuals');
const logger = require('../utils/logger');

postRouter.get('/', async (req, res) => {
  const page = req.query.item;
  console.log(page);

  if (page === 'About') {
    await Overview.find({})
      .then(posts => {
        return res.status(200).send(posts);
      })
      .catch(err => {
        logger.logError(err);
        return res.status(500).send('Dataproxy went wrong when get all the posts about');
      });
  } else if (page === 'Document') {
    await Manual.find({})
      .then(posts => {
        return res.status(200).send(posts);
      })
      .catch(err => {
        logger.logError(err);
        return res.status(500).send('Dataproxy went wrong when get all the posts document');
      });
  } else {
    return res.status(500).send('Dataproxy went wrong when get all the posts');
  }
});

postRouter.post('/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { name, describe, page, homeWork } = req.body;
  if (page === 'About') {
    const newPost = new Overview({
      name,
      describe,
    });
    await newPost
      .save()
      .then(() => {
        return res.status(200).send(newPost);
      })
      .catch(err => {
        logger.logError(err);
        return res.status(500).send('Dataproxy went wrong when add the post');
      });
  } else if (page === 'Document') {
    const newPost = new Manual({
      name,
      describe,
      homeWork,
    });
    await newPost
      .save()
      .then(() => {
        return res.status(200).send(newPost);
      })
      .catch(err => {
        logger.logError(err);
        return res.status(500).send('Dataproxy went wrong when add the post');
      });
  } else {
    return res.status(500).send('Dataproxy went wrong when add the post');
  }
});

postRouter.post('/remove', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { id, item } = req.body;
  if (item === 'About') {
    await Overview.findOneAndRemove({ _id: id })
      .then(() => {
        logger.logInfo('xoa thanh cong');
        return res.status(200).send({ id });
      })
      .catch(err => {
        logger.logError('loi khi xoa ', err);
        return res.sendStatus(500);
      });
  } else if (item === 'Document') {
    await Manual.findOneAndRemove({ _id: id })
      .then(() => {
        logger.logInfo('xoa thanh cong');
        return res.status(200).send({ id });
      })
      .catch(err => {
        logger.logError('loi khi xoa ', err);
        return res.sendStatus(500);
      });
  }
});

postRouter.post('/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { name, id, describe, item, homeWork } = req.body;
  if (item == 'About') {
    await Overview.updateOne(
      { _id: id },
      { $set: { name, describe, updated_at: new Date() } },
      { upsert: true },
    )
      .then(() => {
        logger.logInfo('edit post thanh cong');
        return res.status(200).send({ id, name, describe });
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  } else {
    await Manual.updateOne(
      { _id: id },
      { $set: { name, describe, homeWork, updated_at: new Date() } },
      { upsert: true },
    )
      .then(() => {
        logger.logInfo('edit post thanh cong');
        return res.status(200).send({ id, name, describe, homeWork });
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  }
});

module.exports = postRouter;
