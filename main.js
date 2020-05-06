const redis = require("redis");

const { app, redisClient: client } = require('./client.js')



client.on("error", function (error) {
  console.error(error);
});

client.set("key", "value", redis.print);
client.get("key", redis.print);

// client.subscribe('msg', (v) => {
//   console.log('message', v);
// })
for (let i = 0; i < 1000000; i++) {
  client.lpush('queue', Math.random() + " Kč")
  // client.lpop('queue');
}
console.log('done')

app.post('/greet/:id', function (req, res) {
  console.log(req.params.id);
  console.log(req.body);
  res.send(req.body)
  client.setex('greet/' + req.params.id, 9999999999, req.body.msg);
  client.set('greet/' + req.params.id, req.body.msg);
})


app.get('/greet/:id', function (req, res) {
  client.get('greet/' + req.params.id, (err, v) => {
    console.log(v)
    res.send(v)

  })
})


