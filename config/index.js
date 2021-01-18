const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.dbID,
    password: process.env.dbPW,
    database: process.env.dbDB,
    host: process.env.dbHost,
    dialect: process.env.dbDialect,
    port: process.env.dbPort,
  },
};
