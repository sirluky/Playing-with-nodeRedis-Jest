// const {} = require('jest')
const utils = require('./utils');
const { app, redisClient: client } = require('./client.js')




test('adds 1 + 2 to equal 3', () => {

  expect(1 + 2).toBe(3);
});
// utils.getMyName()

test('REDIS PING PONG', () => {
  client.PING((err, res) => expect(res).toBe('PONG'))

});

test('HMSET', () => {
  const me = { fname: "Lukáš", lname: "Kovář", age: 19 };
  client.HMSET('clovek', me, (err, res) => {
    expect(res).toBe('OK');


  })
})

test('HMGET', () => {
  client.HMGET('clovek', ['fname', 'age'], (err, res) => {
    expect(res).toStrictEqual(['Lukáš', '19'])
    // console.log(res);
  })
})

test('REDIS STOP', () => {
  // client.PING((err, res) => expect().toBe('PONG'))
  client.quit((err, res) => expect(res).toBe('OK'))
  // .

});



