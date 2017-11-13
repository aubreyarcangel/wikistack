const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const wikiRouter = require('./wiki')
var models = require('../models');
var Page = models.Page;

router.use('/users', userRouter);
router.use('/wiki', wikiRouter);


router.get('/', function(req, res, next) {
  const page = Page.findAll({})
  .then((pages) => {
    res.render('index', {pages});
  });
});


module.exports = router;