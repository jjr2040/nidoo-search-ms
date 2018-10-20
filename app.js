require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');

const api = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const mongoUrl = process.env.MONGODB_URI || 'mongodb://search-db:27017/nidooSearch';

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const server = http.createServer(app);
const port = process.env.PORT || 8080;

app.set('port', port);

server.listen(port, () =>  console.log(`API running on localhost:${port}`));
