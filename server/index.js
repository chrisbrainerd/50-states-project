const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const places = require('./places.json');
const serverless = require('serverless-http');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
})

// create a GET route
app.get('/places', (req, res) => {
  res.send(places);
});

// create a POST route
app.post('/places', bodyParser.json(), (req, res) => {
  const newFeature = {
    "type": "Feature",
    "properties": {
      "id": req.body.id,
      "name": req.body.name
    },
    "geometry": {
      "type": "Point",
      "coordinates": req.body.coordinates
    }
  };
  fs.readFile(path.join(__dirname, './places.json'), (err, data) => {
    const geojson = JSON.parse(data);
    geojson.features.push(newFeature);
    fs.writeFile(path.join(__dirname, './places.json'), JSON.stringify(geojson), (err) => {
      console.log('writing to file')
      if (err) { console.log('error writing file:', err)};
      res.status(200).json({
        message: `${req.body.name} successfully written`
      })
    })
  })

});

module.exports.handler = serverless(app);