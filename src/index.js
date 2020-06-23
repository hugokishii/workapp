require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/files', express.static(path.resolve(__dirname, 'temp', 'uploads')));

require('./app/controllers/index.js')(app);


app.listen(3333);