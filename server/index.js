const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

const places = require('./places.json');
const port = 5000;
const serverless = require('serverless-http');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// create a GET route
app.get('/places', (req, res) => {
  res.send(places);
});

app.get('/map-bundle', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'map-bundle.js'));
});
app.get('/map-css', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'map.css'));
});

app.get('/form-bundle', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'form-bundle.js'));
});
app.get('/form-css', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'form.css'));
});

// create a POST route
app.post('/places', bodyParser.json(), (req, res) => {
  const newFeature = {
    type: 'Feature',
    properties: {
      ...req.body
      // "id": req.body.id,
      // "name": req.body.name,
      // "address": req.body.address
    },
    geometry: {
      type: 'Point',
      coordinates: req.body.coordinates
    }
  };
  fs.readFile(path.join(__dirname, './places.json'), (err, data) => {
    const geojson = JSON.parse(data);
    geojson.features.push(newFeature);
    fs.writeFile(
      path.join(__dirname, './places.json'),
      JSON.stringify(geojson),
      (err) => {
        console.log('writing to file');
        if (err) {
          console.log('error writing file:', err);
        }
        res.status(200).json({
          message: `${req.body.name} successfully written`
        });
      }
    );
  });
});

if (process.env.npm_lifecycle_script === `nodemon index.js`) {
  // nodemon isn't passing env variables :'(
  app.listen(port, () => console.log(`Listening on port ${port}`));
}
module.exports.handler = serverless(app);
