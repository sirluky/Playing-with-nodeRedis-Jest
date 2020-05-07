// const {} = require('jest')
const utils = require('./utils');
const { app, redisClient: client } = require('./client.js')




test('EVAL => 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);

  client.eval('return ARGV[1] + ARGV[2]', '0', 1, 2, (err, res) => {
    expect(err).toBe(null)
    expect(parseInt(res)).toBe(3);
  })
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

test('HGETALL', () => {
  // client.HMGET('clovek', ['fname', 'age'], (err, res) => {
  // expect(res).toStrictEqual(['Lukáš', '19'])
  // console.log(res);
  // })
  client.HGETALL('clovek', (err, res) => {

    expect(res).toStrictEqual({ fname: "Lukáš", lname: "Kovář", age: "19" });
  })
})



test('HSCAN', () => {
  // client.HMGET('clovek', ['fname', 'age'], (err, res) => {
  // expect(res).toStrictEqual(['Lukáš', '19'])
  // console.log(res);
  // })
  client.HSCAN('clovek', '0', 'match', '?name', (err, res) => {
    // console.log(res, err)
    expect(res[0]).toBe("0");
    expect(res[1]).toStrictEqual(['fname', 'Lukáš', 'lname', 'Kovář']);
    // console.log('err')

  })
})

test('EVENT SET', () => {
  utils.User.eadd({ name: "Lukas", age: 19, id: 1 }, (err, res) => {
    expect(res).toBe('OK')

    utils.User.eadd({
      name: "Radim", age: 14, id: 1
    }, (err, res) => {
      expect(res).toBe('OK')
    })
  })
})

test('EVENT FINDALL', () => {
  // client.HMGET('clovek', ['fname', 'age'], (err, res) => {
  // expect(res).toStrictEqual(['Lukáš', '19'])
  // console.log(res);
  // })
  // client.HSCAN('clovek', '0', 'match', '?name', (err, res) => {
  //   // console.log(res, err)
  //   expect(res[0]).toBe("0");
  //   expect(res[1]).toStrictEqual(['fname', 'Lukáš', 'lname', 'Kovář']);
  //   // console.log('err')

  // })
  utils.User.efindAll((err, res) => {
    // console.log(res)

    // expect(res[1]).toStrictEqual([{ name: "Lukas", age: 19 }, { name: "Radim", age: 14 }])
    // return 'ahoj'
  })
})

test('REDIS STOP', () => {
  // client.PING((err, res) => expect().toBe('PONG'))
  client.quit((err, res) => expect(res).toBe('OK'))
  // .

});



