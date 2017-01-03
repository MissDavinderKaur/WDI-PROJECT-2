const express         = require('express');
const morgan          = require('morgan');
const bodyParser      = require('body-parser');
const ejsLayouts      = require('express-ejs-layouts');
const methodOverride  = require('method-override');
const mongoose        = require('mongoose');
const router          = require('./config/routes');

const app             = express();
const port            = process.env.PORT || 3000;

const databaseURL = 'mongodb://localhost/tododb';
mongoose.connect(databaseURL, () => {
  return console.log(`App is connected to the ${databaseURL} database`);
});

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/bower_components`));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true} ));
app.use(methodOverride(req => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(ejsLayouts);

app.use('/', router);

app.listen(port, () => {
  console.log(`Application has started on port: ${port}`);
});
