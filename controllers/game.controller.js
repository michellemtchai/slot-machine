const game = require('../helpers/game');
const gameLogic = require('../helpers/game.logic');

module.exports = GameController = {
    start: (req, res) => {
        req.session.credit = 10;
        res.json({
            credit: req.session.credit,
        });
    },
    play: (req, res) => {
        let credit = req.session.credit;
        if (!credit || credit === 0) {
            game.clearSession(req, res, {
                inSession: false,
                message: game.NO_CREDIT,
            });
        } else {
            let { won, result } = gameLogic.gameResult(credit);
            credit = gameLogic.calculateCredit(
                credit,
                result[0],
                won
            );
            req.session.credit = credit;
            res.json({
                inSession: true,
                blocks: result,
                credit: credit,
            });
        }
    },
    cashout: (req, res) => {
        let credit = req.session.credit;
        if (credit) {
            game.clearSession(req, res, {
                inSession: false,
                message: game.savedCredit(credit),
            });
        } else {
            res.json({
                inSession: false,
                message: game.NO_CREDIT,
            });
        }
    },
};
