let config;

const env = process.env.NODE_ENV;

const configDev = {
  db: 'mongodb://localhost:27017/meanauth',
  secretKey: 'secretKey1',
  secret: 'mysecret',
  env,
};

const configProd = Object.assign({}, configDev);

if (env === 'production') config = configProd;
else config = configDev;

module.exports = config;