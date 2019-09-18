# 50 states map

This map involves a [Serverless](https://serverless.com/) backend and a react frontend.

The backend is an API Gateway + Lambda that serves out a feature collection of geojson points.

The React frontend renders a map, where you can input points of interest that will be written to the backend and pinned to the map.

## Start the frontend

In a new terminal, do

```bash
# make sure you're at the project base, ie ~/50-state-project
$ npm start
```

This should tell you the app is starting at localhost:8080.

You can go to localhost:8080 and you should be able to see the map!

## Deploy the backend

To deploy, you will need to install Serverless and [create an AWS account](https://aws.amazon.com/getting-started/). Once your account is created, you will need to [configure your AWS profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) so that your Terminal has access to your AWS credentials.

```bash
npm i -g serverless
cd server
sls deploy
```

If you wish to take down your URL, run `sls remove`

## Data

Data points (places of interest) exist in `server/places.json` as a geojson feature collection. The backend writes to this file and serves it out based on the response handed to it from the frontend.

To remove points, you can simple delete features from the geojson and restart the server.

## To do

- [ ] Add a pop up displaying info for each point on the map
- [ ] Don't automatically add points on geocoder result. On geocoder result, the user should be given the option of whether or not they want to add it to the map (along with other user input, like why Kate and Tom should go there!)
