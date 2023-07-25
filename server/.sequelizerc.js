const path = require("path");

module.exports = {
    config: path.resolve("database", "config.js"),
    "model-path": path.resolve("database", "models"),
    "seeders-path": path.resolve("database", "seeders"),
    "migrations-path": path.resolve("database", "seeders")
}