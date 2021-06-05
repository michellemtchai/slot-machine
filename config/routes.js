const ApplicationController = require('../controllers/application.controller');
const PwaController = require('../controllers/pwa.controller');
const GameController = require('../controllers/game.controller');

module.exports = (app) => {
    app.get('/', ApplicationController.index);
    app.get('/robots.txt', PwaController.robots);
    app.get(
        process.env.APP_PUBLIC_URL + '/manifest.json',
        PwaController.manifest
    );

    // routes for game
    app.get('/game/start', GameController.start);
    app.post('/game/play', GameController.play);
    app.post('/game/cashout', GameController.cashout);

    //The 404 Route (ALWAYS Keep this as the last route)
    app.get('*', ApplicationController.notFound);
};
