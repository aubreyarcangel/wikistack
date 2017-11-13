const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res, next) {
  res.redirect('/');
});


router.post('/', (req, res, next) => {
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then((values) => {
  const user = values[0];
  const title = req.body.title
  const content = req.body.content
  const page = Page.build({
    title,
    content
  });
  return page.save().then((page)=> {
    return page.setAuthor(user);
  })
  .then((page)=>{
    res.redirect(page.route)
  })
 })
});

router.get('/add', (req, res, next) => {
  res.render('addpage');
});

router.get('/:urlTitle', (req, res, next) => {
  Page.findOne({ 
    where: { 
      urlTitle: req.params.urlTitle 
    },
    include: [
      {model: User, as: 'author'}
  ] 
  })
  .then(function(foundPage){
    if (foundPage === null) {
      res.status(404).send();
    } else {
    res.render('wikipage', foundPage.dataValues);
    }
  })
  .catch(next);
});


  

module.exports = router;