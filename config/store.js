module.exports = (session, next) => {
    const MongoStore = require('connect-mongodb-session')(session);
    const store = new MongoStore(
        {
            uri: process.env.DB_URI,
        },
        (err) => {
            if (err) {
                console.error('Not Connected to Database ERROR! ', err);
            } else {
                console.log('Connected to Database');
                next();
            }
        }
    );
    return store;
};
