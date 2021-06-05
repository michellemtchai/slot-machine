module.exports = (session, next) => {
    const MongoStore = require('connect-mongodb-session')(
        session
    );

    const {
        DB_USERNAME,
        DB_PASSWORD,
        DB_HOST,
        DB_PORT,
        DB_DATA,
    } = process.env;

    const mongoUri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATA}?authSource=admin`;
    const store = new MongoStore(
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
    );
    return store;
};
