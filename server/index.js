const express = require('express');
const nedb = require('nedb');
const rest = require('express-nedb-rest');
const cors = require('cors');

const app = express();
const db = new nedb({
  filename: 'tastyApp.db',
  autoload: true
});

const api = rest();

api.addDatastore('tasties', db);

app.use(cors());
app.use('/', api);

app.listen(3000);
