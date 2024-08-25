#! /bin/sh

if [ "$NODE_ENV" = "production" ]; then
    # install packages
    yarn install

    # Build Angular app
    cd ./frontend
    yarn install
    mkdir -p ./src/environments
    node ../docker/setup.js
    yarn build

    # Go back to app root
    cd ..

    # copy angular build files
    mv -v ./frontend/build/* ./public
    node ./docker/build-frontend.js
fi
