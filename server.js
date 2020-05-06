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
app.use(express.json());
app.use(require('./routes/api/auth'));
app.use(require('./routes/api/post'));
app.use(require('./routes/api/user'));

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
