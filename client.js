require('dotenv').config()

var debug = require('debug')('redisessentials:server');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const redis = require("redis");
const bodyParser = require('body-parser')
const express = require('express');
const bluebird = require('bluebird');


const redisClient = redis.createClient({
  auth_pass: process.env.REDIS_AUTH,
  host: process.env.REDIS_HOST,
  prefix: process.env.REDIS_PREFIX,
  port: parseInt(process.env.REDIS_PORT),

});

const app = express();


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



if (!process.env.JEST_WORKER_ID) {

  app.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`))


}
// console.log('PING')
// console.log(process.env)








bluebird.promisifyAll(redisClient);
// redisClient.setAsync('lll', 'lul')



module.exports = { app, redisClient };