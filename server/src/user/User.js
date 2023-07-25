const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Model = Sequelize.Model;

class User extends Model {}

User.init(
  {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    skill: {
      type: Sequelize.STRING,
    },
  },
  { sequelize, modelName: "user" }
);

module.exports = User;
