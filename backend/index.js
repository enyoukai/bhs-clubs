const express = require('express')
const app = express()
const port = 3001

let clubs = {
  1: {
    id: '1',
    name: 'programming',
  },
  2: {
    id: '2',
    name: 'robo',
  },
};

app.get('/clubs', (req, res) => {
  return res.send(Object.values(clubs));
})

app.get('/clubs/:clubId', (req, res) => {
  return res.send(clubs[req.params.clubId]);
})

app.post('/clubs', (req, res) => {
  return res.send('post request');
})

app.put('/clubs/:clubId', (req, res) => {
  return res.send(`put request on ${req.params.clubId} id`);
})

app.delete('/clubs/:clubId', (req, res) => {
  return res.send(`delete request ${req.params.clubId} id`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})