const manifestData = require('../assets/manifest');
const rootPath = require('path').resolve(__dirname, '../');

module.exports = {
    manifest: (req, res) => {
        res.json(manifestData);
    },
    robots: (req, res) => {
        res.sendFile(`${rootPath}/assets/robots.txt`);
    },
};
