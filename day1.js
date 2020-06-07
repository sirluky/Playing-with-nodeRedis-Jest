const redis = require("redis");

const { app, redisClient: client } = require('./client.js')

app.get('/', (req, res) => {
  res.render('index', { title: "Loutak" })
})

app.get('/error', (req, res) => {
  res.send('error ...')
})


app.post('/', async (req, res) => {
  let url = req.body.url;
  let id = req.body.short;
  console.log(id, url)

  let result = await client.setnxAsync(`short:${id}`, url);

  res.json(result);
})

app.get('/:id', async (req, res) => {
  let url = await client.getAsync(`short:${req.params.id}`);
  url = url || "http://localhost:8080/error"
  console.log(url);
  res.redirect(url)
})



