const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const favicon = require('serve-favicon');

module.exports = (app, express) => {
    // use gzip compression
    app.use(compression());

    // set favicon
    app.use(favicon('/app/public/favicon.ico'));

    if (process.env.APP_ENV == 'development') {
        // allow cross-origin requests
        app.use(cors());
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
};
