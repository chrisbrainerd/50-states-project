50 states map
---

This map involves an express backend and a react frontend. The express backend serves out a feature collection of geojson points, while the react frontend renders a map, where you can input points of interest that will be written to the backend and pinned to the map.


## Run it

To run this you will need to start the **server** and the **react frontend**. If you just start the react frontend, the map will render, but the data won't.

### Start the server

```bash
$ cd server
$ npm start
````

It should tell you the server is listening at localhost:5000.

For developing, it may be helpful to use `nodemon` to enable hot reloading. Instead of `npm start`, you can run `nodemon index.js`.

### Start the frontend

In a new terminal, do

```bash
# make sure you're at the project base, ie ~/50-state-project
$ npm start
```

This should tell you the app is starting at localhost:8080.

You can go to localhost:8080 and you should be able to see the map!


## Data

Data points (places of interest) exist in `server/places.json` as a geojson feature collection. The backend writes to this file and serves it out based on the response handed to it from the frontend.

To remove points, you can simple delete features from the geojson and restart the server.


## To do

- [ ] Add a pop up displaying info for each point on the map
- [ ] Don't automatically add points on geocoder result. On geocoder result, the user should be given the option of whether or not they want to add it to the map (along with other user input, like why Kate and Tom should go there!)
