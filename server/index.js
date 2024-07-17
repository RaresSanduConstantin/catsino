const express = require('express');
const axios = require('axios'); // Import Axios
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Users route
// Users route
app.get('/users', (req, res) => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => res.json(response.data))
      .catch(error => res.status(500).send(error.toString()));
  });

// Photos route
app.get('/photos', (req, res) => {
  axios.get('https://jsonplaceholder.typicode.com/photos')
    .then(response => res.json(response.data))
    .catch(error => res.status(500).send(error.toString()));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});