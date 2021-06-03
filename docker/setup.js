// load .env variables
require('dotenv').config({ path: '/app/.env' });
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
    API_BASE_URL: '${apiBaseUrl}',
    NODE_ENV: '${process.env.NODE_ENV}',
    production: ${productionMode},
};
`;
writeFile(envFile, envData);

const proxyFile = '../frontend/proxy.conf.json';
const proxyData = !productionMode
    ? {
          '/game/*': {
              target: apiBaseUrl,
              secure: false,
              logLevel: 'debug',
              changeOrigin: true,
              pathRewrite: { '^/game': '' },
          },
      }
    : {};
writeFile(proxyFile, JSON.stringify(proxyData));
