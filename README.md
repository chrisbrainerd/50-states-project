## 50 states map

This map involves an express backend and a react frontend. The express backend serves out a feature collection of geojson points, while the react frontend renders a map, where you can input points of interest that will be written to the backend and pinned to the map.

## Run it

`npm run ci && npm run start`

This will simultaneously start the server using nodemon and the UI using webpack-dev-server. Make any changes to either the server or the UI and the relevant process should reload itself.

After the UI starts you should see a message telling you to go to localhost:8080 (or whatever port it's loaded on, if 8080 is busy it'll bump to 8081 etc).

## Data

Data points (places of interest) exist in `server/places.json` as a geojson feature collection. The backend writes to this file and serves it out based on the response handed to it from the frontend.

To remove points, you can simple delete features from the geojson and restart the server.

## To do

- [ ] Add a pop up displaying info for each point on the map
- [ ] Don't automatically add points on geocoder result. On geocoder result, the user should be given the option of whether or not they want to add it to the map (along with other user input, like why Kate and Tom should go there!)
