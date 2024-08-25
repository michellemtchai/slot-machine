// load .env variables
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const writeFile = (file, data) => {
    fs.writeFile(path.resolve(__dirname, file), data, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log(`${file} saved.`);
        }
    });
};

const productionMode = process.env.NODE_ENV === 'production';
const apiBaseUrl = !productionMode
    ? `http://localhost:${process.env.APP_PORT}`
    : '';

const envFile = '../frontend/src/environments/environment.ts';
const envData = `export const environment = {
    APP_NAME: '${process.env.APP_NAME}',
    APP_PUBLIC_URL: '${process.env.APP_PUBLIC_URL}',
    API_BASE_URL: '${apiBaseUrl}',
    NODE_ENV: '${process.env.NODE_ENV}',
    production: ${productionMode},
};
`;
writeFile(envFile, envData);

if (!productionMode) {
    const proxyFile = '../frontend/proxy.conf.json';
    const proxyData = {
        '/game/*': {
            target: apiBaseUrl,
            secure: false,
            logLevel: 'debug',
            changeOrigin: true,
            pathRewrite: { '^/game': '' },
        },
    };
    writeFile(proxyFile, JSON.stringify(proxyData));
}
