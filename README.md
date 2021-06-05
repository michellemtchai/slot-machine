# README
## Objective
You can find the objective of this app [Here](/Objective.md).

## Requirement
You will need `Docker` to run this app.

## Running this app
### Development Mode
First, you will need to create an `.env` so that `Docker` knows where to look for its `docker-compose.yml` file. In order to do that, run the following:
```
cp ./docker/dev.env .env
```
Then, you need to run the following to get the server and the database running:
```
docker-compose up
```
You can access the server on your browser via the following url:
```
http://localhost:3000
```
You can access the frontend app on your browser via the following url:
```
http://localhost:8080
```

### Production Mode
Like in the development mode, you need to
```
cp ./docker/prod.env .env
```
Then, you need to run the following to get the server and the database running:
```
docker-compose up
```
You can access the app on your browser via the following url:
```
http://localhost:3000
```

### Test Cases
To run test cases, run the following command:
```
docker-compose run app yarn test
```