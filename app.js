const Express      = require('express');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const path         = require('path');
const cookieParser = require('cookie-parser');
const faker = require('faker');

const home      = require('./routes/home');;

const app = Express();

app.set('view engine', 'ejs');

app.use(Express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser());
app.use(logger('dev'))
app.use('/', home);

const PORT = 4545;
app.listen(PORT, function () { console.log(`Server listening on http://localhost:${PORT}`)})
