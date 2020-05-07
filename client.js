require('dotenv').config()

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

if (!process.env.JEST_WORKER_ID) {

}
// console.log('PING')
// console.log(process.env)



const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())




//  bluebird.promisifyAll(redisClient);
// redisClient.setAsync('lll', 'lul')

// app.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`))


module.exports = { app, redisClient };