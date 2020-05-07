const redis = require("redis");

const { app, redisClient: client } = require('./client.js')

function getMyName() {
  return "Lukáš Kovář"
}

class User {
  constructor({ name, age }) {
    this.name = name
    this.age = age
  }
  static findAll() {
    client.hscan('users', '0', (err, data) => {
      return data;
    })
  }
  /**
   * 
   * @param cb 
   */
  static efindAll(cb) {
    // (err, data) => {
    //   return data;
    // }
    function dataParser(err, res) {
      let resultKEYS = res[1];
      let result = [];
      // const evCB = new Event
      resultKEYS.forEach(key => {
        client.hgetall(key, (err, res) => {
          result.push(res);
        })
      })


      return cb(err, res);
    }
    client.scan('0', 'MATCH', 'test:users:*', 'COUNT', '1000', dataParser)
    // return client.hscan('users', '0', 'MATCH', 'users: *', dataParser)
  }


  static eadd({ id, name, age }, cb) {
    // (err, data) => {
    //   return data;
    // }
    client.hmset('users:' + id, { name, age }, cb)
    // function dataParser(err, res) {

    //   return func(err, res);
    // }

  }
}


module.exports = { getMyName, User }