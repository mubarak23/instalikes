const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const { MONGOURI } = require('./config/keys');

mongoose.connect('mongodb://root:root123@ds219879.mlab.com:19879/instalike', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('conneted to mongo yeahh');
});
mongoose.connection.on('error', (err) => {
  console.log('err connecting', err);
});

require('./models/User');
require('./models/Post');

app.use(express.json());
app.use(require('./routes/api/auth'));
app.use(require('./routes/api/post'));
app.use(require('./routes/api/user'));

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
