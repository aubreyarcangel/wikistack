const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;


router.get('/', (req, res, next) => {
  User.findAll({}).then(function(users){
    res.render('users', { users: users });
  }).catch(next);
});

router.get('/:userId', (req, res, next) => {
  const userPromise = User.findById(req.params.userId);
  const pagesPromise = Page.findAll({
    where: {
      authorId: req.params.userId
    }
  });
  Promise.all([
    userPromise, 
    pagesPromise
  ])
  .then(function(values) {
    var user = values[0];
    var pages = values[1];
    res.render('userPage', { user, pages });
  })
  .catch(next);
});

module.exports = router;