module.exports = {
    index: (req, res) => {
        if (process.env.APP_ENV === 'production') {
            res.json({ message: 'app running in production' });
        } else {
            res.json({ message: 'app running' });
        }
    },
};
