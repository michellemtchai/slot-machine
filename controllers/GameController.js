const gameLogic = require('./gameLogic');

module.exports = {
    start: (req, res) => {
        req.session.credit = 10;
        res.json({
            credit: req.session.credit,
        });
    },
    play: (req, res) => {
        let credit = req.session.credit;
        if (credit === 0) {
            gameLogic.clearSession(req, res, {
                inSession: false,
                message: noCredit,
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
            gameLogic.clearSession(req, res, {
                inSession: false,
                message: savedCredit(credit),
            });
        } else {
            res.json({
                inSession: false,
                message: noCredit,
            });
        }
    },
};

const noCredit =
    'You have no more credit. Do you want to start a new game?';
const savedCredit = (credit) =>
    `You saved ${credit} credits to your account. Do you want to start a new game?`;
