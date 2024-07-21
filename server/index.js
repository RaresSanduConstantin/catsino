const express = require('express');
const axios = require('axios'); // Import Axios
const cors = require('cors')
const app = express();
const port = 3001;

app.use(cors())

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const catImages = [
  { "id": "2n3", "url": "https://cdn2.thecatapi.com/images/2n3.jpg", "width": 500, "height": 333 },
  { "id": "3md", "url": "https://cdn2.thecatapi.com/images/3md.jpg", "width": 500, "height": 277 },
  { "id": "5q4", "url": "https://cdn2.thecatapi.com/images/5q4.jpg", "width": 400, "height": 602 },
  { "id": "77t", "url": "https://cdn2.thecatapi.com/images/77t.jpg", "width": 500, "height": 375 },
  { "id": "9b0", "url": "https://cdn2.thecatapi.com/images/9b0.jpg", "width": 1200, "height": 800 },
  { "id": "ann", "url": "https://cdn2.thecatapi.com/images/ann.jpg", "width": 500, "height": 500 },
  { "id": "d3h", "url": "https://cdn2.thecatapi.com/images/d3h.jpg", "width": 1695, "height": 1556 },
  { "id": "dag", "url": "https://cdn2.thecatapi.com/images/dag.jpg", "width": 1920, "height": 1080 },
  { "id": "efp", "url": "https://cdn2.thecatapi.com/images/efp.jpg", "width": 500, "height": 375 },
  { "id": "MTgzODU5MQ", "url": "https://cdn2.thecatapi.com/images/MTgzODU5MQ.jpg", "width": 670, "height": 1000 }
];


// Users route
app.get('/users', cors(corsOptions), (req, res) => {
  axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
          const usersWithScoresAndImages = response.data.map((user, index) => ({
              ...user,
              score: 1000000 - (index * 100000),
              catImage: catImages[index % catImages.length]
          }));
          res.json(usersWithScoresAndImages);
      })
      .catch(error => res.status(500).send(error.toString()));
});


// Photos route
app.get('/photos', cors(), (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 1000; // Default limit is 1000 if not specified

  axios.get('https://jsonplaceholder.typicode.com/photos')
    .then(response => {
      const data = response.data.slice(0, limit); // Slice the data to the requested limit
      res.json(data);
    })
    .catch(error => res.status(500).send(error.toString()));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});