const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const favicon = require('serve-favicon');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);

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
    let {
        DB_USERNAME,
        DB_PASSWORD,
        DB_HOST,
        DB_PORT,
        DB_DATA,
    } = process.env;

    let mongoUri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATA}?authSource=admin`;
    app.use(
        session({
            secret: process.env.APP_SESSION_KEY,
            cookie: {
                secure: process.env.APP_USE_HTTPS === '1',
            },
            resave: false,
            saveUninitialized: true,
            store: new MongoStore(
                {
                    uri: mongoUri,
                },
                (err) => {
                    if (err) {
                        console.error(
                            'Not Connected to Database ERROR! ',
                            err
                        );
                    } else {
                        console.log('Connected to Database');
                        next();
                    }
                }
            ),
        })
    );
};
