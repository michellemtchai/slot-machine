module.exports = game = {
    NUM_ROLLS: 3,
    CREDIT_MAPPING: {
        C: 10,
        L: 20,
        O: 30,
        W: 40,
    },
    SYMBOLS: ['C', 'L', 'O', 'W'],
    NO_CREDIT:
        'You have no more credit. Do you want to start a new game?',
    savedCredit: (credit) =>
        `You saved ${credit} credits to your account. Do you want to start a new game?`,
    clearSession: (req, res, response) => {
        req.session.destroy((err) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.json(response);
            }
        });
    },
};
