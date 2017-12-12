const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');


const mongoDB = 'mongodb://127.0.0.1/auth';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// mongoose.connect('mongodb://localhost:auth/auth',{
//   useMongoClient: true,
// });

// var promise = mongoose.connect('mongodb://localhost/auth/auth', {
//   useMongoClient: true,
// });

mongoose.connect('mongodb://localhost/auth', {
  useMongoClient: true,
});

app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'})); 
router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

console.log('Server listening on: ', port);