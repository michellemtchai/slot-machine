# README
## Requirement
You will need `Docker` to run this app.

## Running this app
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

## Test Cases
To run backend test cases, run the following command:
```
docker-compose run app yarn test
```
**Note:** Make sure sure you're not running `docker-compose up` at the same time. There will be a port conflict if you do.


To run frontend test cases, run the following command:
```
docker-compose run app yarn frontend-test
```
**Note:** The frontend build process is very slow, so you might have to wait for quite some time.
