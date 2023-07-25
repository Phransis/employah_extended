const Sequelize = require("sequelize");
const config = require("config");

const dbConfig = config.get("database");

const sequelize = new Sequelize(
  dbConfig.dbname,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
    logging: dbConfig.logging,
  }
);
