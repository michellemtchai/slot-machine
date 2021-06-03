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

const targetPath = path.resolve(
  __dirname,
  '../frontend/src/environments/environment.ts'
);
const productionMode = process.env.NODE_ENV === 'production';
const envConfigFile = `export const environment = {
   APP_NAME: '${process.env.APP_NAME}',
   NODE_ENV: '${process.env.NODE_ENV}',
   production: ${productionMode}
};
`;

writeFile(targetPath, envConfigFile);
