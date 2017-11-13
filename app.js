const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const app = express();
const makesRouter = require('./routes')
const path = require('path');

const models = require('./models')

app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html');
nunjucks.configure('views', { noCache: true });

models.db.sync({force: true})
.then(function() {
  app.listen(1337, function() {
    console.log('Server is on port 1337');
  })
})
.catch(() => {
  console.log('Error')
})   


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use(morgan('dev'));

app.use(makesRouter);
