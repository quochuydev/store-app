require("dotenv").config();

const env = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL || "mongodb://localhost:27017/grocery",
  serverUrl: process.env.SERVER_URL || "http://localhost:3000",
};

module.exports = env;
