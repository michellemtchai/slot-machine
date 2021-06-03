#! /bin/sh
function yarn_install(){
    echo "yarn install at /app$1"
    cd "/app$1"
    yarn --no-bin-links install
}
function yarn_start(){
    cd "/app$1"
    yarn start
}
yarn_install /
yarn_install /frontend
yarn_start / & yarn_start /frontend
