const manifestData = require('../assets/manifest');
const rootPath = require('path').resolve(__dirname, '../');

module.exports = {
    index: (req, res) => {
        if (process.env.NODE_ENV === 'production') {
            res.sendFile(`${rootPath}/public/index.html`);
        } else {
            res.render('pages/index', {
                rootPath: `${rootPath}/views`,
                assets: {
                    js: [],
                    css: [],
                },
                icons: manifestData.icons,
            });
        }
    },
    notFound: (req, res) => {
        res.status(404).json({
            message: 'Page not found.',
        });
    },
};
