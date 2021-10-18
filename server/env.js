require("dotenv").config();

const env = {
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  serverUrl: SERVER_URL,
  container: process.env.CONTAINER,
};

module.exports = env;
