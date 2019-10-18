# 50 states map

This map involves a [Serverless](https://serverless.com/) backend and a react frontend.

The backend is an API Gateway + Lambda that serves out a feature collection of geojson points.

The React frontend renders a map, where you can input points of interest that will be written to the backend and pinned to the map.

## Start everything

In a new terminal, do

```bash
# make sure you're at the project base, ie ~/50-state-project
$ npm ci
$ npm run install # custom script that will install deps for the three sub-modules
$ npm start
```

This script will tell you it's starting a development server on port 3000, but in the background it's:

- starting the suggestion map UI on port 3000
- starting the suggestion form UI on port 3001
- starting the server in dev mode on port 5000

## Deploy the backend

To deploy, you will need to install Serverless and [create an AWS account](https://aws.amazon.com/getting-started/). Once your account is created, you will need to [configure your AWS profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) so that your Terminal has access to your AWS credentials.

```bash
npm i -g serverless
cd server
sls deploy
```

If you wish to take down your URL, run `sls remove`

Alternatively, you can run `npm run deploy-server` or `npm run teardown-server` to delpoy and teardown.

## Data

Data points (places of interest) exist in `server/places.json` as a geojson feature collection. The backend writes to this file and serves it out based on the response handed to it from the frontend.

To remove points, you can simple delete features from the geojson and restart the server.

## To do

- [ ] polish form UI (remove twitter?)
- [ ] add in "places to eat" place category
