require("dotenv").config();

const env = {
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  serverUrl: SERVER_URL,
};

module.exports = env;
