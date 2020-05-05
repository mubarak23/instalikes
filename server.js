const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();

require('./models/user');
require('./models/post');

//initialize middleware
app.use(express.json({ extended: false }));

//setup the middlware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());
app.use('api/auth', require('./routes/api/auth'));
app.use('api/post', require('./routes/api/post'));
app.use('/api/user', require('./routes/api/user'));

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log('server is running on', PORT);
});
