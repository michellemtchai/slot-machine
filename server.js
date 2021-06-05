'use strict';

// App
const express = require('express');
const app = express();

// setup app
const bootstrap = require('./config/bootstrap');
bootstrap(app, express);

// start listening at port
let server = app.listen(
    process.env.APP_PORT,
    process.env.APP_HOST,
    () => {
        console.log(
            'App listening at http://%s:%s',
            server.address().address,
            server.address().port
        );
    }
);
module.exports = app; // for testing
