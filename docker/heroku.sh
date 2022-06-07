#! /bin/sh

# Build Angular app
cd ./frontend
yarn install
mkdir -p ./src/environments
node ../docker/setup.js
yarn build

# Go back to app root
cd ..

# copy angular build files
mv ./frontend/build/* ./public
node ./docker/build-frontend.js

# run app
APP_PORT="$PORT" yarn prod
