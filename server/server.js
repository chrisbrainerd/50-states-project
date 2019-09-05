const express = require('express');
const app = express();
const fs = require('fs');
const places = require('./places.json');
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})
// create a GET route
app.get('/places', (req, res) => {
  res.send(places);
});
