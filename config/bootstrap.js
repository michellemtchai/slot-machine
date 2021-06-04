module.exports = (app, express) => {
    // initialize app
    require('./initialize')(app, express, () => {
        // loads routes
        require('./routes')(app);
    });
};
