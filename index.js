const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database.js');
const path = require('path');
const authentication = require('./routes/authentication')(router);




mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Could NOT connect to db: ', err);
  } else {
    console.log('Connected to the db ' + config.db);
  }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.static(__dirname + '/client/dist/client'));
app.use('/authentication', authentication);


app.get('*', (req, res) => res.sendFile(path.join(__dirname + '/client/dist/client/index.html')));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
