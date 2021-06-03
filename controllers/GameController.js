const gameLogic = require('./gameLogic');

module.exports = {
    start: (req, res) => {
        res.json({
            credit: 10,
        });
    },
    play: (req, res) => {
        let credit = parseInt(req.body.credit);
        let [won, rollResult] = gameLogic.gameResult(credit);
        res.json({
            won: won,
            blocks: rollResult,
            credit: gameLogic.calculateCredit(
                credit,
                rollResult[0],
                won
            ),
        });
    },
    cashout: (req, res) => {
        let credit = parseInt(req.params.credit);
        res.json({
            message: `You saved ${credit} credits to your account`,
        });
    },
};
