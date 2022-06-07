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
echo "moving files to /public"
mv -v ./frontend/build/* ./public
echo "finish moving files"
node ./docker/build-frontend.js
echo "finish generating frontend"
