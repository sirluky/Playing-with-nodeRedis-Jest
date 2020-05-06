const redis = require("redis");

const { app, redisClient: client } = require('./client.js')

function getMyName() {
  return "Lukáš Kovář"
}


module.exports = { getMyName }