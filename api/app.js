require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

mongoose
  .connect('mongodb://localhost/wirecard-api', { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const index = require('./routes/index');
const status = require('./routes/status');

app.use('/', index);
app.use('/status', status);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

module.exports = app;
