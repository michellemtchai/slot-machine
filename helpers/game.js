module.exports = game = {
    clearSession: (req, res, response) => {
        req.session.destroy((err) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.json(response);
            }
        });
    },
    noCredit:
        'You have no more credit. Do you want to start a new game?',
    savedCredit: (credit) =>
        `You saved ${credit} credits to your account. Do you want to start a new game?`,
};
