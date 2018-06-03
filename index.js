const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database.js');
const path = require('path');


mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Could NOT connect to db: ', err);
  } else {
    console.log('Connected to the db ' + config.db);
  }
});

app.use(express.static(__dirname + '/client/dist/client'));


app.get('*', (req, res) => res.sendFile(path.join(__dirname + '/client/dist/client/index.html')));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
