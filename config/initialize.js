const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const favicon = require('serve-favicon');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const store = require('./store');

module.exports = (app, express, next) => {
    // use gzip compression
    app.use(compression());

    // set favicon
    app.use(favicon('/app/public/favicon.ico'));

    if (process.env.NODE_ENV == 'development') {
        // allow cross-origin requests
        app.use(
            cors({
                origin: `http://localhost:${process.env.FRONTEND_PORT}`,
                credentials: true,
            })
        );
    } else {
        app.use(
            cors({
                credentials: true,
            })
        );
    }
    // parse request body
    app.use(
        bodyParser.urlencoded({ extended: false, limit: '50mb' })
    );
    app.use(bodyParser.json({ limit: '50mb' }));

    // make static files in /public availiable
    app.use(
        process.env.APP_PUBLIC_URL,
        express.static('public')
    );

    // set view engine as ejs
    app.set('view engine', 'ejs');

    // setup session
    app.use(
        session({
            secret: process.env.APP_SESSION_KEY,
            cookie: {
                secure: process.env.APP_USE_HTTPS === '1',
            },
            resave: false,
            saveUninitialized: true,
            store: store(session, next),
        })
    );
};
