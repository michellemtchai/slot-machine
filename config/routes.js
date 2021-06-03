const ApplicationController = require('../controllers/ApplicationController');
const GameController = require('../controllers/GameController');

module.exports = (app) => {
    app.get('/', ApplicationController.index);

    // routes for game
    app.get('/game/start', GameController.start);
    app.post('/game/play', GameController.play);
    app.post('/game/cashout', GameController.cashout);

    //The 404 Route (ALWAYS Keep this as the last route)
    app.get('*', ApplicationController.index);
};
