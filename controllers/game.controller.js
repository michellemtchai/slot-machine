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
                message: game.noCredit,
            });
        } else {
            let [won, rollResult] = gameLogic.gameResult(credit);
            credit = gameLogic.calculateCredit(
                credit,
                rollResult[0],
                won
            );
            req.session.credit = credit;
            res.json({
                inSession: true,
                blocks: rollResult,
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
                message: game.noCredit,
            });
        }
    },
};
