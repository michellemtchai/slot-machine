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
        let [won, rollResult] = gameLogic.gameResult(credit);
        credit = gameLogic.calculateCredit(
            credit,
            rollResult[0],
            won
        );
        req.session.credit = credit;
        res.json({
            won: won,
            blocks: rollResult,
            credit: credit,
        });
    },
    cashout: (req, res) => {
        let credit = req.body.credit;
        req.session.destroy((err) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.json({
                    message: `You saved ${credit} credits to your account`,
                });
            }
        });
    },
};
